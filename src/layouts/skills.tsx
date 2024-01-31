"use client"

import Image from "next/image"
import { useState } from "react"

const skillsTabs = [
  {
    key: "EXPERIENCE",
    label: "Experiência",
    items: [
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
  },
  {
    key: "STUDING",
    label: "Estudando",
    items: [
      "Node JS",
      "Jest",
      "Cypress"
    ],
  },
  {
    key: "INTERESTING",
    label: "Interesse",
    items: [
      "Vue JS",
      "Mongo DB",
    ]
  }
]

export default function Skills() {
  const [skillsFilter, setSkillsFilter] = useState("EXPERIENCE")

  return (
    <section id="linguagens-e-ferramentas">
    <div className="container flex justify-between items-center relative py-24">
      <div className="w-full max-w-[500px]">
        <p className="text-primary uppercase font-semibold font-inter mb-2 text-xs tracking-widest">
          # Skills
        </p>

        <h2 className="text-3xl font-bold mb-12 tracking-wider">
          Linguagens <br />
          e ferramentas
        </h2>

        <div className="flex gap-9 mb-6">
          {skillsTabs.map(({ key, label }, i) => {
            const active = skillsFilter === key

            return (
              <button
                key={key}
                onClick={() => setSkillsFilter(key)}
                className={`${active ? "text-white" : "text-white/50"} font-inter group flex flex-col items-center font-medium text-xs uppercase tracking-widest`}
              >
                {label}

                {active && <div className="w-4 h-1 rounded-full bg-primary mt-1 transition-all duration-300" />}
              </button>
            )
          })}
        </div>

        <div className="w-full flex flex-wrap gap-3">
          {skillsTabs.find(item => item.key === skillsFilter)?.items.map((item, idx) => (
            <span
              key={item}
              style={{ transitionDelay: `0.${idx + 1}s`}}
              className={`font-inter font-medium cursor-default py-2 px-4 rounded-full border border-solid transition-all
              border-secondary bg-secondary/10 text-secondary text-xs opacity-100`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative w-full h-[300px] max-w-[400px] flex items-center justify-center">
        {/* <div className="w-36 h-36 bg-primary blur-[70px] absolute z-0 top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4" /> */}

        <div className="absolute w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-tr from-white/20 to-white/10 backdrop-blur -rotate-[15deg]">
          <Image
            alt=""
            src="/svgs/icon-react.svg"
            width={26}
            height={26}
            loading="lazy"
          />
        </div>

        <div className="absolute left-16 top-[10%] w-[72px] h-[72px] flex items-center justify-center rounded-lg bg-gradient-to-br from-white/20 to-white/10 backdrop-blur -rotate-[10deg]">
          <Image
            alt=""
            src="/svgs/icon-next.svg"
            width={48}
            height={48}
            loading="lazy"
            className="brightness-0 invert"
          />
        </div>

        <div className="absolute right-10 top-[15%] w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-bl from-white/20 to-white/10 backdrop-blur rotate-[15deg]">
          <Image
            alt=""
            src="/svgs/icon-tailwind.svg"
            width={34}
            height={34}
            loading="lazy"
          />
        </div>

        <div className="absolute left-10 top-[60%] w-20 h-20 flex items-center justify-center rounded-lg bg-gradient-to-tr from-white/20 to-white/10 backdrop-blur -rotate-[20deg]">
          <Image
            alt=""
            src="/svgs/icon-js.svg"
            width={42}
            height={42}
            loading="lazy"
            className="rounded"
          />
        </div>

        <div className="absolute right-14 top-2/4 w-[72px] h-[72px] flex items-center justify-center rounded-lg bg-gradient-to-tl from-white/20 to-white/10 backdrop-blur rotate-[15deg]">
          <Image
            alt=""
            src="/svgs/icon-github.svg"
            width={38}
            height={38}
            loading="lazy"
            className="brightness-0 invert"
          />
        </div>
      </div>
    </div>
  </section>
  )
}