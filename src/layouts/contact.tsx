import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react"
import Link from "next/link"

const links = [
  {
    icon: MailIcon,
    url: "mailto:davidrezendeartagnan619@gmail.com",
    label: "davidrezendeartagnan619@gmail.com"
  },
  {
    icon: LinkedinIcon,
    url: "https://linkedin.com/in/david-artagnan",
    label: "/david-artagnan"
  },
  {
    icon: GithubIcon,
    url: "https://github.com/artagnandev",
    label: "@artagnandev"
  }
]

export default function Contact() {
  return (
    <section className="works overflow-x-hidden">
      <div className="container my-20">
        <div className="w-full max-w-[500px]">
          <p className="text-primary uppercase font-semibold font-inter mb-2 text-xs tracking-widest">
            # Contact
          </p>

          <h2 className="text-3xl font-bold mb-12 tracking-wider">
            Entre em contato
          </h2>
        </div>

        <div className="flex justify-between items-center gap-6">
          {links.map(({ icon: Icon, url, label }) => (
            <Link target="_blank" href={url} key={url} className="group relative flex items-center gap-4">
              <div className="relative z-10 w-14 h-14 rounded-lg flex items-center justify-center bg-primary/10 transition-all">
                <Icon size="22" className="opacity-70 group-hover:opacity-100 transition-all" />
              </div>

              <div className="w-10 h-10 blur-2xl bg-primary absolute left-1 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

              <p className="text-p2 font-medium">
                {label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}