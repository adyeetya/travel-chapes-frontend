"use client";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

const images = [
  "/images/sanghla/sangla_1.webp",
  "/images/sanghla/sangla2.webp",
  "https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/spiti4.webp",
  "https://travelchapes.s3.eu-north-1.amazonaws.com/images/CHOPTA_TUNGNATH/ct7.jpg",
  "https://travelchapes.s3.eu-north-1.amazonaws.com/images/jibhitirthan/jt4.png",
  "https://travelchapes.s3.eu-north-1.amazonaws.com/images/kasol_rudrarg/kasol4.webp",
  "https://travelchapes.s3.eu-north-1.amazonaws.com/images/manali/manali2.webp",
  "https://travelchapes.s3.eu-north-1.amazonaws.com/images/nag-tibba/nt3.webp",
  "https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal/himachal5.webp",
  "https://travelchapes.s3.eu-north-1.amazonaws.com/images/meghalya/meghalaya_7.webp",
  "https://travelchapes.s3.eu-north-1.amazonaws.com/images/meghalya/Meghalaya2.jpg",
];

export default function ImageSlider() {
  return (
    <div
      className="my-12 flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url('/images/kashmir/kashmir_banner_phone.webp')` }}
    >
      {/* Heading */}
      <h2 className={`${pacifico.className} text-4xl sm:text-5xl md:text-6xl text-yellow-500 mb-8 sm:mb-12`}>
        Wall of Memories
      </h2>

      {/* Image Slider */}
      <Swiper
  effect="coverflow"
  grabCursor={true}
  centeredSlides={true}
  loop={true}
  slidesPerView={1}
  spaceBetween={0} // Ensures proper centering on small screens
  centerInsufficientSlides={true}
  breakpoints={{
    640: { slidesPerView: 2, spaceBetween: 10 }, // Tablets
    1024: { slidesPerView: 3, spaceBetween: 30 }, // Small laptops
    1280: { slidesPerView: 4, spaceBetween: 50 }, // Desktops
  }}  
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  }}
  navigation={false}
  modules={[EffectCoverflow, Navigation]}
  className="w-full max-w-6xl"
>

        {images.map((src, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={src}
                alt={`Slide ${index}`}
                fill
                quality={90}
                priority={index < 3}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
