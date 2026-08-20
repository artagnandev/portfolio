import "server-only";

import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Verifica em tempo de build se um asset existe em public/.
 * Permite que o hero degrade para um bloco tipográfico quando o retrato
 * ainda não foi adicionado, em vez de servir uma imagem 404.
 */
export const publicAssetExists = (src: string): boolean =>
  existsSync(join(process.cwd(), "public", src.replace(/^\/+/, "")));
