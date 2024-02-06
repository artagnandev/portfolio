import Image from "next/image"

export default function Hero() {
  return (
    <section id="inicio" className="relative flex items-center h-[80vh] pb-20">
      <Image
        alt=""
        src="/svgs/mesh-hero.svg"
        fill
        priority
        className="h-full absolute top-0 left-0"
      />

      <div className="container flex items-center justify-between relative z-10">
        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase font-light">
            Olá 👋, eu sou
          </p>

          <h1 className="text-4xl font-black">
            David <br />
            Artagnan
          </h1>

          <h2 className="text-lg font-semibold mb-6">Dev front-end</h2>

          <p className="text-white/70 font-light">
            Programador com <b className="text-black font-medium bg-secondary px-1">+3 anos de experiência</b>,
            <br />
            morando no Brasil.
          </p>
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