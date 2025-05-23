"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { StatsSection } from "../weekendCarousel/weekendCarousel";
import {
  BrandsCarousel,
  BrandsCarouselContent,
  BrandsCarouselItem,
} from "../../components/ui/bannerCarousel";
// import { destinations } from '@/data/destinations/destinations'
import { IoIosSearch } from "react-icons/io";

const webBanners = [
  { id: 1, image: "/images/homepage/banner1.webp" },
  { id: 2, image: "/images/homepage/banner2.webp" },
  { id: 3, image: "/images/homepage/banner3.webp" },
  { id: 4, image: "/images/homepage/banner4.webp" },
];
const phoneBanners = [
  { id: 1, image: "/images/homepage/phonebanner1.webp" },
  { id: 2, image: "/images/homepage/phonebanner2.webp" },
  { id: 3, image: "/images/homepage/phonebanner3.webp" },
  { id: 4, image: "/images/homepage/phonebanner4.webp" },
];

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
const Banner = () => {
  const [isInView, setIsInView] = useState(true);
  const [visibleBanners, setVisibleBanners] = useState(webBanners.slice(0, 2));
  const bannerRef = useRef(null);

  useEffect(() => {
    // Set a timer to update visible banners after 2 seconds
    const timer = setTimeout(() => {
      setVisibleBanners(webBanners); // Show all banners
    }, 2000);

    // Cleanup the timer when the component unmounts or the effect re-runs
    return () => clearTimeout(timer);
  }, [webBanners]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (bannerRef.current) {
        const { top, bottom } = bannerRef.current.getBoundingClientRect();
        setIsInView(top < window.innerHeight && bottom >= 0);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={bannerRef} className="relative w-full">
      <BrandsCarousel
        autoplay={isInView}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <BrandsCarouselContent className="">
          {visibleBanners.map((card) => (
            <BrandsCarouselItem key={card.id} className="basis-full">
              <div className="relative w-full">
                <Image
                  src={card.image}
                  alt="banner"
                  width={2000}
                  height={0}
                  priority
                  className="w-full h-screen object-cover"
                />
              </div>
            </BrandsCarouselItem>
          ))}
        </BrandsCarouselContent>
      </BrandsCarousel>
    </div>
  );
};

const PhoneBanner = () => {
  const [isInView, setIsInView] = useState(true);
  const [visibleBanners, setVisibleBanners] = useState(
    phoneBanners.slice(0, 2)
  );
  const bannerRef = useRef(null);

  useEffect(() => {
    // Set a timer to update visible banners after 2 seconds
    const timer = setTimeout(() => {
      setVisibleBanners(webBanners); // Show all banners
    }, 2000);

    // Cleanup the timer when the component unmounts or the effect re-runs
    return () => clearTimeout(timer);
  }, [webBanners]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (bannerRef.current) {
        const { top, bottom } = bannerRef.current.getBoundingClientRect();
        setIsInView(top < window.innerHeight && bottom >= 0);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={bannerRef} className="relative w-full h-[calc(100vh-3rem)]">
      <BrandsCarousel
        autoplay={isInView}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-screen"
      >
        <BrandsCarouselContent className="">
          {visibleBanners.map((card) => (
            <BrandsCarouselItem key={card.id} className="basis-full">
              <div className="relative w-full">
                <Image
                  src={card.image}
                  alt="banner"
                  width={2000}
                  height={0}
                  priority
                  className="w-full h-screen object-cover"
                />
              </div>
            </BrandsCarouselItem>
          ))}
        </BrandsCarouselContent>
      </BrandsCarousel>
    </div>
  );
};

const Hero = () => {
  // console.log(product)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    // Asynchronously load destinations data
    const loadDestinations = async () => {
      const { destinations } = await import("@/data/destinations/destinations");
      setDestinations(destinations);
    };

    loadDestinations();
  }, []);

  // Function to handle the search
  const handleSearch = (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    if (searchQuery.trim() === "") return; // Prevent search if query is empty
    const filteredDestinations = destinations.filter(
      (destination) =>
        destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.metaTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredDestinations);
  };

  return (
    <div className="relative z-0 w-full h-[100vh] md:min-h-screen rounded-br-[2rem] -mt-16 overflow-hidden customCurve">
      {/* Desktop Image */}
      <div className=" absolute inset-0 overflow-hidden rounded-b-3xl">
        {/* <Banner /> */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        >
          <source src="/images/videos/Main_banner.webm" type="video/webm" />

        </video>
      </div>

      {/* Mobile Image */}
      {/* <div className="block md:hidden absolute inset-0 rounded-b-3xl">
        <PhoneBanner />
      </div> */}

      <div className="absolute mt-16 inset-0 z-10 flex flex-col justify-between items-start px-4">
        {/* texts */}
        <div className=" flex flex-col justify-end w-full  mb-20 py-4 h-full items-center md:items-center overflow-hidden max-w-screen-xl mx-auto">
          <div className=" text-gray-100 text-center z-10">
            <h1
              className="text-3xl md:text-5xl mb-1 2xl:text-6xl text-gray-100 tracking-wide 2xl:tracking-widest"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.1px #b8b8b8",
              }}
            >
              Chase Adventures
            </h1>
            <h1
              className="text-3xl md:text-5xl text-gray-100 tracking-wide 2xl:tracking-widest"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.1px #b8b8b8",
              }}
            >
              Create Memories
            </h1>
            <p
              className="text-base md:text-xl mb-12"
              style={{
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              }}
            >
              TravelChapes Where dreams meet destinations
            </p>

            {/* <div className="flex justify-center gap-4 items-center">
              <form onSubmit={handleSearch} className="flex gap-4 items-center">
              <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search for destinations"
  className="bg-white/20 backdrop-blur-xl border border-white/40 shadow-lg w-full md:w-96 text-black py-3 px-8 md:px-14 rounded-full text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
/>
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="bg-white/30 backdrop-blur-xl border border-white/40 shadow-md w-fit text-gray-700 p-2 rounded-full text-sm hover:bg-black hover:text-gray-100 transition-all"
                >
                  <IoIosSearch className="w-7 md:w-9 md:h-9 h-7" />
                </button>
              </form>
            </div> */}

            {searchResults.length > 0 && (
              <div className="relative">
                <div className="z-50 flex flex-1 w-fit max-w-full bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white/30 text-white my-4 px-2 md:px-4 rounded-md">
                  <div className="flex flex-col w-full gap-1">
                    {searchResults.map((destination) => (
                      <div key={destination.id} className="p-2">
                        <Link href={`/destination/${destination.id}`}>
                          <h3 className="text-sm text-gray-200 break-words whitespace-normal">
                            {destination.title}
                          </h3>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <StatsSection />
        </div>

        {/* explore products */}

        <div className="absolute bottom-0 left-0 md:ml-auto flex items-center w-full h-16 mx-auto border-none shadow-none">
          <div className="z-50 flex flex-1 w-[calc(100vw-4rem)] shadow-none justify-end items-center h-16 bg-white rounded-bl-none rounded-[2rem] p-2">
            <div className="flex flex-col w-[18rem] gap-1">
              {/* Circles with Background Images */}
              <div className="z-50 flex flex-row justify-center gap-3 items-center w-full ">
                <div className="flex -space-x-4">
                  <div
                    className="w-10 h-10 bg-cover bg-center border bg-white border-gray-400 rounded-full"
                    style={{
                      backgroundImage: 'url("/images/circle1.webp")',
                    }}
                  ></div>
                  <div
                    className="w-10 h-10 bg-cover bg-center border bg-white border-gray-400 rounded-full"
                    style={{
                      backgroundImage: 'url("/images/homepage/banner1.webp")',
                    }}
                  ></div>
                  <div
                    className="w-10 h-10 bg-cover bg-center bg-white border border-gray-400 rounded-full flex items-center justify-center"
                    style={{
                      backgroundImage: 'url("/images/circle2.jpg")',
                    }}
                  ></div>
                  <div
                    className="hidden w-10 h-10 bg-cover bg-center bg-white border border-gray-400 rounded-full md:flex items-center justify-center"
                    style={{
                      backgroundImage: 'url("/images/homepage/banner4.webp")',
                    }}
                  ></div>
                  {/* <span>+2</span> */}
                </div>

                {/* Text */}
                <div className="text-left ">
                  <a
                    href="#"
                    className="flex items-center space-x-2 font-semibold text-sm"
                  >
                    <span>Ready. Set. Explore! </span>
                  </a>

                  <p className="z-50 text-xs">Explore Destinations</p>
                </div>
              </div>
            </div>
          </div>
          {/* button side */}
          <div className="flex w-16 h-16 justify-center items-center">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white/30 h-12 w-12 rounded-full flex justify-center items-center shadow-lg">
              <span className="text-xl md:text-3xl text-white flex justify-center items-center">
                ↓
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
