'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
} from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'



const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(null) // Tracks the active slide for mobile

  const cards = [
    {
      id: 1,
      image: '/images/team/afreen.webp',
      text: 'Afreen Khan - Founder and Director of Sales.',
      description:
        'Hands down the vibrant force behind our travel community’s buzz and bookings. Weaving up stories that are convincing enough to turn your Wanderlust into finally checking off your wishlist. A complete social butterfly, who always has answers to what’s trending and what’s not. Makes sure to capture perfect photos ans videos for you on the trips. A flamboyant,chirpy, humorous and here for the drama kinda woman who loves to take charge!',
    },
    {
      id: 2,
      image: '/images/team/jahnoor.jpg',
      text: 'Jahanoor Alam - Founder and CEO',
      description:
        'Not just a CEO, but an adventure enthusiast! With a knack of finding the RIGHT KINDA souls who live to Wander through his genious marketing skills and When not sipping on his Coffee he is always legit crafting quirky itineraries for you. He has had his fair share of being on the ground as the most desired team captain because of the joy he brings on to the table. - Currently Striving to turn Travel Dreams into Reality as the only mission!',
    },
    {
      id: 3,
      image: '/images/team/kashish.jpg',
      text: 'Kashish Bharti - Founder and Chief of Operations',
      description:
        'Kashish the Explorer, is the mastermind behind the smooth sailing of our travel experiences. With a decent history of being on the ground and living with the locals all over the world, he is a charmer and a sureshot favorite nomad life goals. Experienced enough to curate top notch services be it your travel or stays to make you FEEL AT HOME, He has got you covered! His Favorite hobby is to turn on ground chaos into easy breasy adventures and he LIVES FOR ROUTES AND FUN!',
    },
  ]

  const toggleDescription = (id) => {
    setActiveSlide((prev) => (prev === id ? null : id))
  }

  return (
    <div className="w-full h-auto p-4">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={1}
        navigation={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper p-4"
      >
        {cards.map((card) => (
          <SwiperSlide
            key={card.id}
            className="relative flex p-2 my-4 flex-col items-center justify-end bg-cover bg-center rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${card.image})`,
              width: '300px',
              height: '450px',
            }}
            onClick={() => toggleDescription(card.id)} // Toggle description on tap
          >
            {/* Bottom Glass Effect Text */}
            <div className="z-10 absolute left-0 rounded-b-lg bottom-0 w-full bg-opacity-50 bg-white backdrop-blur-md text-center p-4">
              <h2 className="text-lg text-white">{card.text}</h2>
            </div>
            {/* Hover / Tap Description */}
            <div
              className={`absolute inset-0 flex md:hidden items-center justify-center transition-opacity duration-300 z-20 text-center ${
                activeSlide === card.id ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-black bg-opacity-75 text-white p-4 text-xs text-left">
                <p>{card.description}</p>
              </div>
            </div>
            <div className="hidden absolute inset-0 md:flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 z-20 text-center">
              <div className="bg-black bg-opacity-75 text-white p-4 text-xs text-left">
                <p>{card.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const AboutUsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome to <span className="text-yellow-600">TravelChapes!</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            At TravelChapes, we believe that travel is more than just a journey;
            it&apos;s an adventure waiting to unfold. Our mission is to empower
            travellers—especially solo female travellers—to explore the world
            with confidence, curiosity, and safety.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Trustable */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">Trustable</h3>
            <p className="mt-4 text-gray-600">
              Trust is the basis of any form of travel. Our extensive network of
              verified partners ensures worry-free travel experiences for women,
              backed by unwavering support and expert guidance.
            </p>
          </div>
          {/* Adventures */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">
              Adventures
            </h3>
            <p className="mt-4 text-gray-600">
              Life is not just for ordinary adventures. We craft extraordinary
              journeys that push boundaries and offer unforgettable moments that
              spark your wanderlust.
            </p>
          </div>
          {/* Exploring */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">Exploring</h3>
            <p className="mt-4 text-gray-600">
              We unveil hidden gems through meticulously planned itineraries,
              revealing the true essence of destinations while ensuring safety.
            </p>
          </div>
          {/* Safety */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">Safety</h3>
            <p className="mt-4 text-gray-600">
              Your safety is paramount. With comprehensive safety tips,
              protocols, and 24/7 support, we help you focus on making real
              memories while feeling secure.
            </p>
          </div>
          {/* Solo Female Travelers */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">
              Solo Female Travelers
            </h3>
            <p className="mt-4 text-gray-600">
              We celebrate the spirit of solo female travellers with special
              programs and a supportive community, enabling women to explore
              fearlessly.
            </p>
          </div>
          {/* Community */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">Community</h3>
            <p className="mt-4 text-gray-600">
              At TravelChapes, you&apos;re not just a traveller; you&apos;re
              part of a vibrant, inclusive community. Connect with like-minded
              explorers, share experiences, and create memories that last a
              lifetime.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Join us at <span className="text-yellow-600">TravelChapes</span> and
            transform your travel dreams into reality!
          </h2>
          <p className="mt-4 text-gray-600">
            Whether you&apos;re looking to make lifelong friends or explore the
            world on your own terms, we empower women to embrace adventure with
            confidence.
          </p>
        </div>
      </div>
    </section>
  )
}

const page = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <section className="flex flex-col-reverse md:flex-row justify-center w-full my-12">
        <div className="md:w-1/3 w-full flex flex-col justify-center items-start px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 mb-6">
            At{' '}
            <span className="text-yellow-600 font-semibold">TravelChapes</span>,
            our team is more than just a group of professionals; we&apos;re
            passionate explorers dedicated to creating unforgettable travel
            experiences. Each member brings unique expertise, creativity, and
            energy to the table, ensuring your journey is as seamless as it is
            memorable.
          </p>
          <p className="text-gray-600">
            From crafting perfect itineraries to ensuring your safety and
            comfort, our team works tirelessly behind the scenes and on the
            ground. Together, we’re building a community where your travel
            dreams come to life!
          </p>
        </div>
        <div className="md:w-2/3 w-full">
          {' '}
          <Slider />
        </div>
      </section>
      <section className="mb-12">
        <AboutUsSection />
      </section>
    </div>
  )
}

export default page
