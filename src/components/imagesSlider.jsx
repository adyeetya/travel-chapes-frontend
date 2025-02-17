"use client";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const images = [
  "/images/sanghla/sangla_1.webp",
  "/images/sanghla/sangla2.webp",
    "https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/spiti4.webp",
  "https://travelchapes.s3.eu-north-1.amazonaws.com/images/CHOPTA_TUNGNATH/ct7.jpg",
  'https://travelchapes.s3.eu-north-1.amazonaws.com/images/jibhitirthan/jt4.png',
  'https://travelchapes.s3.eu-north-1.amazonaws.com/images/kasol_rudrarg/kasol4.webp',
  'https://travelchapes.s3.eu-north-1.amazonaws.com/images/manali/manali2.webp',
  'https://travelchapes.s3.eu-north-1.amazonaws.com/images/nag-tibba/nt3.webp',
  'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal/himachal5.webp',
  'https://travelchapes.s3.eu-north-1.amazonaws.com/images/meghalya/meghalaya_7.webp',
  'https://travelchapes.s3.eu-north-1.amazonaws.com/images/meghalya/Meghalaya2.jpg',

];

export default function ImageSlider() {
  return (
    <div
      className="my-12 relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url('/images/kashmir/kashmir_banner_phone.webp')` }}
    >
      {/* Heading */}
      <h2 className={`${pacifico.className} text-5xl sm:text-6xl text-yellow-500 mb-12`}>
        Wall of Memories
      </h2>

      {/* Image Slider */}
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4} // Show 4 images
        spaceBetween={50} // Adjust spacing
        loop={true} // Infinite loop
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.5,
          slideShadows: false,
        }}
        navigation={false}
        modules={[EffectCoverflow, Navigation]}
        className="w-full px-12"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="relative w-[220px] sm:w-[250px]">
            <div className="relative w-full h-[350px] sm:h-[450px] rounded-lg overflow-hidden shadow-lg transition-transform duration-300">
              <Image
                src={src}
                alt={`Slide ${index}`}
                width={250}
                height={450}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
