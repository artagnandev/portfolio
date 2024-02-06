import Slider from "./slider";

export default function Works() {
  return (
    <section className="works overflow-x-hidden">
      <div className="container my-20">
        <div className="w-full max-w-[500px]">
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
  )
}