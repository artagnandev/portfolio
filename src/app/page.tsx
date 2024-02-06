import { Hero, About, Skills, Works, Contact, Footer, Header } from "../layouts";

export default function Home() {
  return (
    <main className="relative">
      <Header />

      <Hero />

      {/* <About /> */}

      <Skills />

      <Works />

      <Contact />

      <Footer />
    </main>
  )
}
