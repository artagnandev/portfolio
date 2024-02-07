import { MenuIcon } from "lucide-react";
import Link from "next/link";

const links = [
  {
    label: "Início",
    route: "#inicio",
  },
  {
    label: "Linguagens e ferramentas",
    route: "#linguagens-e-ferramentas",
  },
  {
    label: "Meus trabalhos",
    route: "#meus-trabalhos",
  },
  {
    label: "Contato",
    route: "#contato",
  },
];

export default function Header() {
  return (
    <header className="sticky z-[99] backdrop-blur-xl top-0">
      <div className="container w-full flex items-center justify-between border-b border-white/10 py-5 px-2">
        <p className="font-bold font-inter">d.artagnan</p>

        <nav className="flex gap-8 max-md:hidden">
          {links.map(({ label, route }) => (
            <Link
              key={route}
              href={route}
              className="text-white/70 transition-all text-sm whitespace-nowrap hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button className="px-3 py-2 border border-solid border-primary/70 rounded hidden items-center gap-2 text-xs max-md:flex">
          Menu
          <MenuIcon size={18} />
        </button>
      </div>
    </header>
  );
}
