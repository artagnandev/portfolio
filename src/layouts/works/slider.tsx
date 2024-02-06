"use client"

import { array } from "@/src/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./card";

import 'swiper/css';

export default function Slider() {
  return (
    <Swiper
      freeMode={true}
      spaceBetween={28}
      slidesPerView="auto"
      className="!overflow-visible"
    >
      {array(10).map((i) => (
        <SwiperSlide key={i} className="max-w-max">
          <Card
            title="Move.it"
            image="/images/works/moveit.jpg"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem por incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            tools={["Next JS", "Tailwind", "Node JS"]}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}