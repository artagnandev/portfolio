import Image from "next/image";

interface Props {
  title: string
  image: string
  tools: string[]
  description: string
}

export default function Card({ title, description, image, tools }: Props) {
  return (
    <div className="group rounded w-full max-w-[364px] cursor-pointer">
      <div className="relative mb-8">
        <div className="overflow-hidden rounded-xl relative z-10">
          <Image
            alt="Move.it"
            src={image}
            width={364}
            height={214}
            loading="lazy"
            quality={100}
            placeholder="empty"
            className="transition-all duration-300 group-hover:scale-110"
          />
        </div>

        <div className="w-32 h-32 bg-primary blur-2xl absolute z-0 -bottom-1 left-2/4 
          transition-all duration-300 -translate-x-2/4 opacity-0 group-hover:opacity-100
        "></div>
      </div>

      <div className="px-3">
        <p className="text-2xl font-semibold mb-4">
          {title}
        </p>

        <p className="text-sm leading-[20px] opacity-70 font-light">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-8">
          {tools.map((tool) => (
            <span
              key={tool}
              className={`font-inter font-medium cursor-default py-1 px-3 rounded-full border border-solid transition-all
              border-secondary bg-secondary/10 text-secondary text-xs opacity-100`}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}