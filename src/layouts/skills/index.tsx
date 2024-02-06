import Image from "next/image"
import Tabs from "./tabs"

export default function Skills() {
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
          
          <Tabs />
        </div>

        <div className="relative w-full h-[300px] max-w-[400px] flex items-center justify-center">
          <div className="absolute w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 backdrop-blur -rotate-[15deg]">
            <Image
              alt=""
              src="/svgs/icon-react.svg"
              width={26}
              height={26}
              loading="lazy"
            />
          </div>

          <div className="absolute left-16 top-[10%] w-[72px] h-[72px] flex items-center justify-center rounded-lg bg-primary/10 backdrop-blur -rotate-[10deg]">
            <Image
              alt=""
              src="/svgs/icon-next.svg"
              width={48}
              height={48}
              loading="lazy"
              className="brightness-0 invert"
            />
          </div>

          <div className="absolute right-10 top-[15%] w-16 h-16 flex items-center justify-center rounded-lg bg-primary/10 backdrop-blur rotate-[15deg]">
            <Image
              alt=""
              src="/svgs/icon-tailwind.svg"
              width={34}
              height={34}
              loading="lazy"
            />
          </div>

          <div className="absolute left-10 top-[60%] w-20 h-20 flex items-center justify-center rounded-lg bg-primary/10 backdrop-blur -rotate-[20deg]">
            <Image
              alt=""
              src="/svgs/icon-js.svg"
              width={42}
              height={42}
              loading="lazy"
              className="rounded"
            />
          </div>

          <div className="absolute right-14 top-2/4 w-[72px] h-[72px] flex items-center justify-center rounded-lg bg-primary/10 backdrop-blur rotate-[15deg]">
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