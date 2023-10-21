"use client"

import Image from "next/image";
import Link from "next/link";
import { Tilt } from "react-tilt"
import { useState } from "react";

const links = [
  {
    label: "Início",
    route: "#inicio"
  },
  {
    label: "Sobre mim",
    route: "#sobre-mim"
  },
  {
    label: "Linguagens e ferramentas",
    route: "#linguagens-e-ferramentas"
  },
  {
    label: "Meus trabalhos",
    route: "#meus-trabalhos"
  }
]

const tools = {
  EXPERIENCE: [
    "Next JS",
    "React JS",
    "Typescript",
    "Tailwind CSS",
    "Styled Components",
    "Javascript (Vanilla)",
    "Wordpress",
    "Git & Github",
    "HTML5"
  ]
}

export default function Home() {
  const [skillsFilter, setSkillsFilter] = useState<"EXPERIENCE" | "STUDING" | "INTERESTING">("EXPERIENCE")

  const arr = (length: number) => Array.from({ length }, (_: any, i: number) => i + 1)

  const defaultOptions = {
    max: 10,     // max tilt rotation (degrees)
    axis: null,   // What axis should be disabled. Can be X or Y.
    scale: 1,
    reset: true,    // If the tilt effect has to be reset on exit.
    speed: 1000,   // Speed of the enter/exit transition
    easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    reverse: false,  // reverse the tilt direction
    transition: true,   // Set a transition on enter/exit.
    perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
  }

  return (
    <main className="">
      <section id="inicio" className="relative flex items-center h-[80vh]">
        <Image
          alt=""
          src="/svgs/mesh.svg"
          fill
          priority
          className="h-full absolute top-0 left-0"
        />

        <div className="container flex items-center justify-between relative z-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm uppercase font-light">
              Olá 👋, eu sou
            </p>

            <h1 className="text-4xl font-bold">
              David <br />
              Artagnan
            </h1>

            <h2 className="text-lg font-semibold mb-6">Dev front-end</h2>

            <p className="text-white/70 font-light">
              Programador com <b className="text-black font-medium bg-rose px-1">+3 anos de experiência</b>,
              <br />
              morando no Brasil.
            </p>
          </div>

          <Tilt options={defaultOptions} className="relative w-full max-w-[290px]">
            <div className="w-full relative transition-all">
              <div className="relative z-10 w-full flex flex-col gap-7 rounded-lg border border-solid border-white/25 p-10 bg-gradient-to-br from-white/10 to-white/10 backdrop-blur-[6px]">
                {links.map(({ label, route }) => (
                  <Link key={route} href="#" className="text-white/90 transition-all whitespace-nowrap font-inter">
                    {label}
                  </Link>
                ))}

                <button className="w-full p-4 rounded bg-blue text-white uppercase font-semibold text-xs tracking-wider">
                  Contate-me
                </button>
              </div>

              <div className="w-40 h-40 aspect-square bg-blue rounded-full blur-3xl absolute -bottom-10 -left-6 opacity-60" />
            </div>
          </Tilt>
        </div>
      </section>

      <section id="sobre-mim">
        <div className="group container relative flex items-center justify-between py-24">
          <div className="absolute w-full h-full flex justify-between left-0 top-0">
            {arr(5).map((i) => (
              <div key={i} className="w-px h-full border border-solid border-white/10 opacity-50" />
            ))}
          </div>

          <div className="w-full max-w-[500px]">
            <p className="text-blue uppercase font-semibold font-inter mb-2 text-xs tracking-widest">
              # About
            </p>

            <h2 className="text-3xl font-bold mb-6 tracking-wider">
              Sobre mim
            </h2>

            <span className="text-white/60 font-inter">
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi cum, <b className="text-black font-medium bg-rose px-1">delectus magnam optio</b> ad delectus magnam optio, officia, nesciunt vitae dolor libero deleniti non asperiores rerum saepe nihil reiciendis. Magni.
              </p>

              <p>
                Sou apaixonado por <b className="text-black font-medium bg-rose px-1">desenvolvimento front-end</b> e dedicado a construir soluções incríveis para pessoas e empresas. Já desenvolvi projetos para empresas de todos os níveis: Desde soluções simples como sites estáticos a aplicações complexas.
              </p>
            </span>
          </div>

          <div className="relative">
            <Image
              alt=""
              src="/images/picture.png"
              width={350}
              height={428}
              quality={100}
              className="saturate-0 relative z-10 transition-all"
            />

            <div className="w-36 h-36 absolute z-0 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 transition-all duration-300 blur-3xl bg-blue group-hover:opacity-100 group-hover:scale-125 rounded-full" />
          </div>
        </div>
      </section>

      <section id="linguagens-e-ferramentas">
        <div className="container flex justify-between items-center relative py-24">
          <div className="w-full max-w-[500px]">
            <p className="text-blue uppercase font-semibold font-inter mb-2 text-xs tracking-widest">
              # Skills
            </p>

            <h2 className="text-3xl font-bold mb-12 tracking-wider">
              Linguagens <br />
              e ferramentas
            </h2>

            <div className="flex gap-9 mb-6">
              {["Experiência", "Estudando", "Interesse"].map((item, i) => (
                <button
                  key={item}
                  className={`${i === 0 ? "text-white" : "text-white/50"} group flex flex-col items-center font-medium text-xs uppercase tracking-widest`}
                >
                  {item}

                  {i === 0 && <div className="w-2 h-2 rounded-full bg-blue mt-2 transition-all duration-300" />}
                </button>
              ))}
            </div>

            <div className="w-full flex flex-wrap gap-3">
              {tools.EXPERIENCE.map((item) => (
                <span key={item} className="cursor-default py-2 px-4 rounded-full border border-solid border-rose bg-rose/10 text-rose text-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-[400px] flex items-center justify-center">
            <div className="w-36 h-36 bg-blue blur-[100px] absolute z-0 top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4" />

            <div className="absolute top-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-tr from-white/20 to-white/10 backdrop-blur -rotate-[15deg]">
              <Image
                alt=""
                src="/svgs/icon-react.svg"
                width={24}
                height={24}
                loading="lazy"
              />
            </div>

            <div className="absolute w-20 h-20 flex items-center justify-center rounded-lg bg-gradient-to-tr from-white/20 to-white/10 backdrop-blur -rotate-[20deg]">
              <Image
                alt=""
                src="/svgs/icon-next.svg"
                width={50}
                height={50}
                loading="lazy"
                className="brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
