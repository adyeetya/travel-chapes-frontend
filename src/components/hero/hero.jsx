"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ServerUrl } from "@/app/config";
import axios from "axios";
import { StatsSection } from "./Stats";
import { IoIosSearch } from "react-icons/io";
import { FiArrowDown, FiMapPin } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { GiJourney } from 'react-icons/gi';

const reviews = [
  {
    id: 1,
    name: "Aarav Mehra",
    place: "Manali, Himachal Pradesh",
    text: "The snow-covered mountains were breathtaking. TravelChapes made everything so seamless!",
    rating: 5
  },
  {
    id: 2,
    name: "Sneha Sharma",
    place: "Leh, Jammu & Kashmir",
    text: "One of the most peaceful trips I’ve had. The itinerary was well balanced and local experiences were amazing.",
    rating: 4
  },
  {
    id: 3,
    name: "Rohan Gupta",
    place: "Shillong, Meghalaya",
    text: "Absolutely loved the waterfalls and caves. The arrangements were perfect for nature lovers.",
    rating: 5
  },
  {
    id: 4,
    name: "Priya Deshmukh",
    place: "Aizawl, Mizoram",
    text: "Very underrated place! The cultural experiences and hospitality were top-notch.",
    rating: 5
  },
  {
    id: 5,
    name: "Kabir Nair",
    place: "Bali, Indonesia",
    text: "It felt like a dream vacation. Everything was taken care of, right from airport pickup to excursions.",
    rating: 5
  },
  {
    id: 6,
    name: "Megha Reddy",
    place: "Da Nang, Vietnam",
    text: "Loved the food, beaches, and energy! Would definitely recommend TravelChapes for Vietnam trips.",
    rating: 4
  },
  {
    id: 7,
    name: "Yash Patel",
    place: "Coorg, Karnataka",
    text: "Coffee plantations and green hills — truly rejuvenating. Great planning by the team.",
    rating: 5
  },
  {
    id: 8,
    name: "Neha Singh",
    place: "Kumarakom, Kerala",
    text: "Backwaters were so peaceful. The stay, food, and boat ride were all memorable!",
    rating: 5
  },
  {
    id: 9,
    name: "Aniket Joshi",
    place: "Sapa, Vietnam",
    text: "The rice terraces and mountain treks were unforgettable. Very smooth experience.",
    rating: 4
  },
  {
    id: 10,
    name: "Ishita Verma",
    place: "Gulmarg, Kashmir",
    text: "Snow skiing in Gulmarg was a bucket list experience. Thank you TravelChapes!",
    rating: 5
  }
];


const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => {
        const total = reviews.length;
        return (prevIndex + 1) % total;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);




  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${ServerUrl}/tripPlans/tripPlansList`,
        { search: searchQuery },
        { headers: { "Content-Type": "application/json" } }
      );
      setSearchResults(response?.data?.result?.docs || []);
    } catch (err) {
      setError("No results found");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const makeUrlFriendly = (category) => {
    return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'));
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar key={i} className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} inline`} />
    ));
  };





  return (
    <div className="relative z-0 w-full h-screen rounded-br-[2rem] -mt-16 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden rounded-b-3xl">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover brightness-75">
          <source src="/images/videos/Main_banner.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-between h-full z-50 px-4 pb-4">

        {/* Top Section: Search + Reviews */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-32 md:mt-20 2xl:mt-36 w-full z-50 ">

          {/* Left - Search */}
          <div className="flex flex-col w-full md:w-1/2 ">
            {/* text section */}
            <div className="mb-8 relative">
              <h1 className="z-50 text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                <span className="text-yellow-400">Chase</span> Adventures
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                Create <span className="text-yellow-400">Memories</span>
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl">
                TravelChapes - Where dreams meet destinations
              </p>
            </div>
            {/* search section */}
            <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
              <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full border border-white/30 overflow-hidden shadow-xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for destinations..."
                  className="w-full py-4 px-6 bg-transparent text-white placeholder-blue-200 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!searchQuery.trim() || loading}
                  className={`p-3 mr-2 rounded-full ${searchQuery.trim() ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-800/50'} transition-colors`}
                >
                  <IoIosSearch className="w-6 h-6 text-white" />
                </button>
              </div>

              {loading && (
                <div className="mt-4 text-blue-100 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                  </svg>
                  Searching...
                </div>
              )}
              {error && (
                <div className="mt-4 text-red-300 flex items-center justify-center">
                  <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
              {searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-blue-900/90 backdrop-blur-md rounded-lg border border-blue-700 shadow-2xl overflow-auto max-h-60">
                  <button
                    type="button"
                    aria-label="Close search results"
                    className="absolute top-2 right-2 text-white bg-blue-800 hover:bg-blue-700 rounded-full p-1 z-50"
                    onClick={() => {
                      setSearchResults([]);
                      setSearchQuery("");
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {searchResults.map((destination) => (
                    <Link
                      key={destination._id}
                      href={`/trip/${Array.isArray(destination.category)
                        ? destination.category.map(makeUrlFriendly).join('&')
                        : makeUrlFriendly(destination.category)}/${destination.slug}`}
                      className="block p-3 hover:bg-blue-800 transition-colors border-b border-blue-800 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <FiMapPin className="flex-shrink-0 text-yellow-400 mr-3" />
                        <h3 className="text-white">{destination.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </form>

          </div>

          {/* Right - Reviews (Desktop) */}
          <div className="hidden md:flex flex-col w-1/2 pl-8 justify-end items-end">
            <div className="relative h-[30vh] overflow-hidden w-full max-w-md">
              <div
                ref={containerRef}
                className="flex flex-col transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateY(-${currentReviewIndex * 5}%)`,
                }}
              >
                {/* Duplicate reviews for infinite loop feel */}
                {[...reviews, ...reviews].map((review, index) => (
                  <div
                    key={index}
                    className="bg-black/30 p-4 mb-4 rounded-lg border border-gray-700 max-w-sm w-full"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{review.name}</h4>
                        <p className="text-gray-200 text-sm">{review.place}</p>
                      </div>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-gray-100 mt-2">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Mobile Reviews Carousel */}
          <div className="md:hidden w-full mt-8 relative">
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}>
                {reviews.map(review => (
                  <div key={review.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-base font-semibold text-white">{review.name}</h4>
                          <p className="text-gray-200 text-xs">{review.place}</p>
                        </div>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-gray-100 mt-2 text-sm">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="flex flex-col items-center justify-between w-full">

          {/* Stats Section - Full Width */}
          <div className="w-full relative mb-4">
            <StatsSection />
          </div>

          {/* Explore Footer - Full Width */}
          <div className=" w-full  ">
            <div className="flex items-center justify-between bg-blue-900/80 backdrop-blur-md rounded-[2rem] p-4 border border-blue-700 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-4">
                  {["/images/circle1.webp", "/images/homepage/banner1.webp", "/images/circle2.jpg", "/images/homepage/banner4.webp"].map((src, i) => (
                    <div key={i} className={`w-10 h-10 bg-cover bg-center bg-white border border-gray-400 rounded-full ${i === 3 ? "hidden md:flex" : ""}`} style={{ backgroundImage: `url("${src}")` }} />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-400 flex items-center">
                    <GiJourney className="mr-1" /> Ready. Set. Explore!
                  </p>
                  <p className="text-xs text-blue-100">Discover amazing destinations</p>
                </div>
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 p-3 rounded-full shadow-md transition-colors">
                <FiArrowDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Hero;