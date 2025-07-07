'use client'
import React, { useState, useEffect } from 'react'
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci'

const reviews = [
  {
    id: 1,
    reviewText:
      'Thank you being there ☺️ you made our trip awesome ✌️☺️we loved your service ✌️😍it and yes thank you to your team as well who were all active all the time responding to all the messages and giving us the places where to visit 💯✌️😃🤩 .In thailand also people were responding very well and up to date 👌😎which made our trip smooth and we had no issues as well 💯☺️. We will recommend ppl about your company also 👌😎',
    destination: 'Thailand',
    reviewerName: 'Aman Pandya',
    url: 'https://maps.app.goo.gl/dBKLe9eDGALSyp968',
    color: 'bg-red-500',
  },
  {
    id: 2,
    reviewText:
      "The past week has been full on which has been great because you haven't the time to feel nervous about what's ahead in your journey. I started this week off feeling a little anxious but after a full day with the group and the guides all those nerves disappeared. /nFirst few days...bring good footwear because you get to see a lot of Valley with a Trip Lead story and secret spots.",
    destination: 'Spiti Valley',
    reviewerName: 'Simranjeet Kaur',
    url: 'https://maps.app.goo.gl/okkx1JP6i7xTEG9S6',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    reviewText:
      'Travel Chapes totally made my spiti trip memorable! Captain deepak bhaiya and Abhishek were awesome, very helpful and our group was super cool. This was my first solo trip, and it was absolutely perfect. Their planning and attention to detail were spot on, adding that extra spark to the whole experience. The stunning landscapes and the great vibe among fellow travelers just clicked perfectly',
    destination: 'Himachal High',
    reviewerName: 'Karishma Rout',
    url: 'https://maps.app.goo.gl/oHr4s7tH9W3AmF557',
    color: 'bg-green-500',
  },
  {
    id: 4,
    reviewText:
      "If you want an experience that sticks with you forever, go ahead and book a trip with Travel Chapes to Spiti Valley. Get ready for stunning views, unforgettable moments, and memories that'll bring a smile for years.",
    destination: 'Ladakh',
    reviewerName: 'Abhishek Yadav',
    url: 'https://maps.app.goo.gl/sBFVFMg3PG9jMKbk6',
    color: 'bg-yellow-500',
  },
]

const getInitials = (name) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
}

const SectionWithCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    )
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextReview()
    }, 10000)

    return () => clearInterval(intervalId)
  }, [currentIndex])

  return (
    <div className="flex px-4 flex-col md:flex-row items-center justify-between p-2 sm:p-4 max-w-screen-xl mx-auto">
      <div className="md:w-1/2 mb-6 md:mb-0">
        <h2 className="text-lg sm:text-2xl md:text-3xl text-left md:font-bold font-semibold my-2 sm:my-4">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          Our customers love our product and have shared their amazing experiences.
        </p>
      </div>

      <div className="md:w-1/2 flex flex-col items-center">
        <div className="w-full p-2 sm:p-3 rounded-lg shadow-lg bg-yellow-100 border border-yellow-300 h-[150px] sm:h-[230px] flex-col items-center justify-between">
          <div className="flex mb-2 sm:mb-3 flex-row justify-start items-center gap-3 sm:gap-4 h-[40px] sm:h-[50px]">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white font-bold ${reviews[currentIndex].color}`}
            >
              {getInitials(reviews[currentIndex].reviewerName)}
            </div>
            <p className="italic font-bold text-xs sm:text-sm">
              {reviews[currentIndex].reviewerName}
            </p>
            <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm">
              {reviews[currentIndex].destination}
            </p>
          </div>
          <div className="flex-1 ml-2 sm:ml-4 max-h-[110px] sm:max-h-[150px] overflow-y-auto">
            <p className="text-gray-800 mt-1 sm:mt-2 text-xs sm:text-sm">
              &apos;
              {reviews[currentIndex].reviewText.length > 180
                ? `${reviews[currentIndex].reviewText.substring(0, 177)}...`
                : reviews[currentIndex].reviewText}
              &apos;
            </p>
            <a
              href={reviews[currentIndex].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-1 sm:mt-2 block text-xs sm:text-sm"
            >
              View Review
            </a>
          </div>
        </div>

        <div className="flex w-full justify-end md:justify-start space-x-2 sm:space-x-4 mt-2 sm:mt-4">
          <button onClick={prevReview} className="">
            <CiCircleChevLeft className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
          <button onClick={nextReview} className="">
            <CiCircleChevRight className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SectionWithCarousel
