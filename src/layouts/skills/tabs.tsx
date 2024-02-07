"use client";

import { useState } from "react";
import { data } from "./data";

export default function Tabs() {
  const [filter, setFilter] = useState("EXPERIENCE");

  return (
    <>
      <div className="flex gap-9 mb-6 max-lg:justify-center">
        {data.map(({ key, label }) => {
          const active = filter === key;

          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`${
                active ? "text-white" : "text-white/50"
              } font-inter group flex flex-col items-center font-medium text-xs uppercase tracking-widest`}
            >
              {label}

              {active && (
                <div className="w-4 h-1 rounded-full bg-primary mt-1 transition-all duration-300" />
              )}
            </button>
          );
        })}
      </div>

      <div className="w-full flex flex-wrap gap-3 max-lg:justify-center">
        {data
          .find((item) => item.key === filter)
          ?.items.map((item, idx) => (
            <span
              key={item}
              style={{ transitionDelay: `0.${idx + 1}s` }}
              className={`font-inter font-medium cursor-default py-2 px-4 rounded-full border border-solid transition-all
            border-secondary bg-secondary/10 text-secondary text-xs opacity-100`}
            >
              {item}
            </span>
          ))}
      </div>
    </>
  );
}
