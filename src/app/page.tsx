import { Hero, About, Skills, Works, Contact } from "../layouts";

export default function Home() {
  return (
    <main className="relative">
      <Hero />

      {/* <About /> */}

      <Skills />

      <Works />

      <Contact />
    </main>
  )
}
