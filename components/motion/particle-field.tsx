"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Espaçamento da malha e raio do ponto em repouso, em px de CSS. */
const SPACING = 38;
const DOT = 0.85;
/** O quanto a lente engorda, ilumina e afasta o ponto do lugar dele. */
const DOT_GAIN = 1.9;
const SHIFT = 6;
const LENS = 150;
const BASE_ALPHA = 0.38;
const LENS_ALPHA = 0.9;
/** Suavização por quadro do foco e da intensidade da lente. */
const FOLLOW = 0.14;
const FADE = 0.08;

type ParticleFieldProps = { className?: string };

/**
 * Malha de pontos em canvas, no espírito de um registro de impressão. O
 * ponteiro age como lente: os pontos por perto crescem, tingem de accent e
 * deslocam-se para fora do centro.
 *
 * Não entra no caminho crítico da dobra — é decoração pintada depois da
 * hidratação, sobre um canvas vazio que não afeta layout nem LCP.
 */
export const ParticleField = ({ className }: ParticleFieldProps) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    // `target` é onde o ponteiro está; `lens`, onde o foco de fato chegou.
    // A distância entre os dois é o arrasto que dá fluidez ao efeito.
    const target = { x: 0, y: 0, strength: 0 };
    const lens = { x: 0, y: 0, strength: 0 };
    const client = { x: 0, y: 0, tracking: false };
    let pendingSync = false;

    // Cores saem dos tokens, então o tema claro/escuro é respeitado de graça.
    const palette = { base: "", lens: "" };
    const readPalette = () => {
      const styles = getComputedStyle(canvas);
      palette.base = styles.getPropertyValue("--ink-faint").trim();
      palette.lens = styles.getPropertyValue("--accent").trim();
    };

    // Pontos acesos do quadro: só os poucos que caem dentro da lente.
    const near: { x: number; y: number; radius: number; alpha: number }[] = [];

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const columns = Math.max(1, Math.floor(width / SPACING));
      const rows = Math.max(1, Math.floor(height / SPACING));
      const originX = (width - (columns - 1) * SPACING) / 2;
      const originY = (height - (rows - 1) * SPACING) / 2;
      const lit = lens.strength > 0.002;

      near.length = 0;
      context.fillStyle = palette.base;
      context.globalAlpha = BASE_ALPHA;

      for (let row = 0; row < rows; row += 1) {
        const gridY = originY + row * SPACING;

        for (let column = 0; column < columns; column += 1) {
          const gridX = originX + column * SPACING;
          let falloff = 0;

          if (lit) {
            const dx = gridX - lens.x;
            const dy = gridY - lens.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < LENS) {
              const edge = 1 - distance / LENS;
              // Smoothstep: a borda da lente não pode ter degrau visível.
              falloff = edge * edge * (3 - 2 * edge) * lens.strength;

              if (falloff > 0.01) {
                const push = distance > 0 ? (falloff * SHIFT) / distance : 0;
                near.push({
                  x: gridX + dx * push,
                  y: gridY + dy * push,
                  radius: DOT + falloff * DOT_GAIN,
                  alpha: falloff * LENS_ALPHA,
                });
              }
            }
          }

          // O ponto-base some sob o ponto aceso; desenhá-lo seria desperdício.
          if (falloff > 0.55) continue;

          context.beginPath();
          context.arc(gridX, gridY, DOT, 0, Math.PI * 2);
          context.fill();
        }
      }

      if (near.length === 0) return;

      context.fillStyle = palette.lens;

      for (const dot of near) {
        context.globalAlpha = dot.alpha;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    // Onde o cursor cai dentro do canvas agora. Lê geometria, então só roda a
    // partir de um evento de ponteiro ou de dentro do quadro.
    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      const x = client.x - rect.left;
      const y = client.y - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

      target.strength = inside ? 1 : 0;

      if (inside) {
        target.x = x;
        target.y = y;
        // Ao entrar do zero, a lente nasce sob o cursor em vez de atravessar
        // a tela até ele.
        if (lens.strength < 0.01) {
          lens.x = x;
          lens.y = y;
        }
      }
    };

    const tick = () => {
      // Medir dentro do quadro: o scroll dispara muito mais vezes do que o
      // navegador pinta, e cada medição força um reflow.
      if (pendingSync) {
        pendingSync = false;
        measure();
      }

      lens.x += (target.x - lens.x) * FOLLOW;
      lens.y += (target.y - lens.y) * FOLLOW;
      lens.strength += (target.strength - lens.strength) * FADE;

      const drift = Math.abs(target.x - lens.x) + Math.abs(target.y - lens.y);
      const settled =
        !pendingSync && drift < 0.4 && Math.abs(target.strength - lens.strength) < 0.002;

      if (settled) {
        // Encosta no alvo e para: quadro parado não precisa de rAF.
        lens.x = target.x;
        lens.y = target.y;
        lens.strength = target.strength;
        draw();
        frame = 0;
        return;
      }

      draw();
      frame = requestAnimationFrame(tick);
    };

    const run = () => {
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Acima de 2x o ganho é invisível e o custo por pixel, não.
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    readPalette();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const viewObserver = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) return;
      // Fora da tela o campo volta ao repouso — não pode reaparecer aceso
      // no ponto onde o cursor estava três seções atrás.
      stop();
      target.strength = 0;
      lens.strength = 0;
      draw();
    });
    viewObserver.observe(canvas);

    // O tema troca uma classe no <html>; os tokens precisam ser relidos.
    const themeObserver = new MutationObserver(() => {
      readPalette();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const fine = window.matchMedia("(pointer: fine)").matches;

    if (reduced || !fine) {
      return () => {
        stop();
        resizeObserver.disconnect();
        viewObserver.disconnect();
        themeObserver.disconnect();
      };
    }

    const handleMove = (event: PointerEvent) => {
      // Só ponteiro fino: em touch não há cursor para seguir.
      if (event.pointerType !== "mouse" || !visible) return;
      client.x = event.clientX;
      client.y = event.clientY;
      client.tracking = true;
      measure();
      run();
    };

    // A página rola sob o cursor parado — a lente tem de acompanhar.
    const handleScroll = () => {
      if (!client.tracking || !visible) return;
      pendingSync = true;
      run();
    };

    const release = () => {
      client.tracking = false;
      target.strength = 0;
      run();
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("blur", release);
    document.addEventListener("pointerleave", release);

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("blur", release);
      document.removeEventListener("pointerleave", release);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
};
