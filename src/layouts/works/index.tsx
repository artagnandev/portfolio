import Slider from "./slider";

export default function Works() {
  return (
    <section id="meus-trabalhos" className="overflow-x-hidden">
      <div className="container py-20 border-y border-solid border-white/10">
        <div className="w-full max-w-[500px] max-lg:flex max-lg:flex-col max-lg:items-center max-lg:text-center max-lg:mx-auto">
          <p className="text-primary uppercase font-semibold font-inter mb-2 text-xs tracking-widest">
            # Works
          </p>

          <h2 className="text-3xl font-bold mb-12 tracking-wider">
            Meus trabalhos
          </h2>
        </div>

        <Slider />
      </div>
    </section>
  );
}
