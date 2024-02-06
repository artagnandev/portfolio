import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative pb-10 pt-10 mt-20">
      <Image
        alt=""
        src="/svgs/mesh-footer.svg"
        width={1320}
        height={500}
        loading="lazy"
        className="h-[250px] w-full absolute bottom-0 left-0 object-cover"
      />

      <div className="container flex justify-between items-center relative z-10">
        <p className="text-sm font-light">
          👨🏻‍💻 Desenhado e desenvolvido por mim.
        </p>

        <Link href={{ hash: "#inicio" }} className="text-sm opacity-70 transition-all hover:opacity-100">
          Voltar ao topo ⤴️
        </Link>
      </div>
    </footer>
  )
}