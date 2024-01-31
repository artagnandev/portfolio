import Image from "next/image";
import { array } from "../utils";
import { FingerprintIcon } from "lucide-react";

export default function About() {
  return (
    <section id="sobre-mim">
      <div className="group container relative flex items-center justify-between py-24">
        <div className="absolute w-full h-full flex justify-between left-0 top-0">
          {array(7).map((i) => (
            <div
              key={i}
              className={`
                w-px h-full opacity-50 bg-gradient-to-b from-transparent to-primary/30
                ${i % 2 == 0 ? "-translate-y-8" : 'translate-y-8'}
              `}
            />
          ))}
        </div>

        <div className="w-full max-w-[450px]">
          <p className="text-primary uppercase font-semibold font-inter mb-2 text-xs tracking-widest">
            # About
          </p>

          <h2 className="text-3xl font-bold mb-6 tracking-wider">
            Sobre mim
          </h2>

          <span className="text-white/60 font-inter">
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi cum, <b className="text-black font-medium bg-secondary px-1">delectus magnam optio</b> ad delectus magnam optio, officia, nesciunt vitae dolor libero deleniti non asperiores rerum saepe nihil reiciendis. Magni.
            </p>

            <p>
              Sou apaixonado por <b className="text-black font-medium bg-secondary px-1">desenvolvimento front-end</b> e dedicado a construir soluções incríveis para pessoas e empresas. Já desenvolvi projetos para empresas de todos os níveis: Desde soluções simples como sites estáticos a aplicações complexas.
            </p>
          </span>
        </div>

        <div className="relative">
          <div className="flex h-[280px] relative z-10 p-3 rounded-lg border border-solid border-primary/50 bg-primary/5 backdrop-blur-lg min-w-[440px]">
            <Image
              alt=""
              src="/images/pic.jpg"
              width={200}
              height={300}
              quality={100}
              className="relative z-10 transition-all rounded-md mr-5"
            />

            <div className="flex flex-col h-full justify-between py-2 pr-2">
              <div className="flex flex-col gap-3">
                <div className="h-5 rounded bg-white/30 w-full"></div>
                <div className="h-5 rounded bg-white/30 w-3/4"></div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase opacity-80 font-medium font-inter">David R. Artagnan</p>
                <p className="text-xs uppercase opacity-80 font-medium font-inter">20 anos</p>
                <p className="text-xs uppercase opacity-80 font-medium font-inter">Brasileiro</p>
                <p className="text-xs uppercase opacity-80 font-medium font-inter">+3 anos de experiência</p>
              </div>
            </div>
          </div>

          <div className="w-32 h-32 absolute -bottom-8 -left-8 bg-primary rounded-full"></div>

          <div className="w-40 h-40 absolute -top-12 -right-8 bg-secondary rounded-full"></div>
        </div>
      </div>
    </section>
  )
}