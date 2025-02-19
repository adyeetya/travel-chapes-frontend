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
    <div className="relative my-12 flex flex-col items-center justify-center min-h-screen px-4">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/videos/Memories_gif.webm" type="video/mp4" />
      </video>

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50"></div>


      {/* Heading */}
      <h2 className={`${pacifico.className} z-10 text-4xl sm:text-5xl md:text-6xl text-white mb-4 sm:mb-8`}>
        Wall of Memories
      </h2>
      <p className="text-white z-10 text-center text-lg md:text-xl max-w-2xl mb-12">
      Preserving moments, cherishing memories—one wall at a time.
      </p>

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
    240: { slidesPerView: 2, spaceBetween: 30 }, // Tablets

    640: { slidesPerView: 2, spaceBetween: 100 }, // Tablets
    1024: { slidesPerView: 3, spaceBetween: 30 }, // Small laptops
    1280: { slidesPerView: 4, spaceBetween: 50 }, // Desktops
  }}  
  coverflowEffect={{
    rotate: -10,
    stretch: 0,
    depth: 150,
    modifier: 1,
    slideShadows: true,
  }}
  navigation={false}
  modules={[EffectCoverflow, Navigation]}
  className="w-full 6xl"
>

        {images.map((src, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="relative w-full max-w-[350px] md:max-w-[400px] aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={src}
                alt={`Slide ${index}`}
                fill
                quality={90}
                priority={index < 3}
                className="object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
