'use client'
import React, { useState, use, useEffect } from 'react'
import Image from 'next/image'
import { destinations } from '@/data/destinations/destinations'
import { Trips } from '@/data/destinations/details'
import { CiCircleChevDown } from 'react-icons/ci'

import { FaCaretDown } from 'react-icons/fa'
import { TripModal } from '@/components/TripModal/TripModal'

const DescriptionWithReadMore = ({ destination }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Render when only `description` exists
  if (destination.description && !destination.detailDescription) {
    const truncatedDescription = destination.description.slice(0, 200)
    const displayText = isExpanded
      ? destination.description
      : `${truncatedDescription}...`

    return (
      <div>
        <p className="text-black">
          {displayText}
          {destination.description.length > 200 && (
            <span
              onClick={handleToggleExpand}
              className="text-blue-500 hover:text-blue-700 cursor-pointer ml-2"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </span>
          )}
        </p>
      </div>
    )
  }

  // Render when `detailDescription` exists
  if (
    destination.detailDescription &&
    destination.detailDescription.length > 0
  ) {
    const firstDetail = destination.detailDescription[0]
    const truncatedDetail = `${firstDetail.title
      }: ${firstDetail.description.slice(0, 200)}...`
    const fullDetail = destination.detailDescription.map((item, index) => (
      <div key={index} className="mb-4">
        {item.title && (
          <h3 className="font-semibold text-xl text-black mb-2">
            {item.title}
          </h3>
        )}
        <p className="text-black">{item.description}</p>
      </div>
    ))

    return (
      <div>
        {!isExpanded && (
          <p className="text-black">
            {truncatedDetail}
            <span
              onClick={handleToggleExpand}
              className="text-blue-500 hover:text-blue-700 cursor-pointer ml-2"
            >
              Read More
            </span>
          </p>
        )}
        {isExpanded && (
          <div>
            {fullDetail}
            <span
              onClick={handleToggleExpand}
              className="text-blue-500 hover:text-blue-700 cursor-pointer mt-2 block"
            >
              Read Less
            </span>
          </div>
        )}
      </div>
    )
  }

  return null
}

const BookingTable = ({ details }) => {
  const [sharingType, setSharingType] = useState('triple')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const handleSelection = (type) => {
    setSharingType(type)
    setDropdownOpen(false)
  }

  return (
    <div>
      {/* Main Section */}
      <div className="bg-gray-100 h-56 mb-4 rounded-lg overflow-hidden">
        {/* Header
        {details?.optionSec && (
          <div className="text-black text-lg p-2">{details?.route}</div>
        )} */}
        <div className="flex bg-blue-600 text-white sticky top-0 gap-2 text-sm w-full">
          {/* Batches */}
          <div className="flex-1 p-2 rounded-tl-lg flex justify-start items-center">
            Batches
          </div>

          {/* Mode of Vehicle */}
          <div className="flex-1 p-2 whitespace-nowrap flex justify-start items-center">
            Mode of Vehicle
          </div>

          {/* Price with Custom Dropdown */}
          <div className="flex-1 p-2 whitespace-nowrap relative">
            <div
              className="bg-blue-600 text-white px-2 py-1 rounded-md flex items-center cursor-pointer justify-between"
              onClick={toggleDropdown}
            >
              {sharingType === 'triple' ? 'Triple Sharing' : 'Double Sharing'}
              <FaCaretDown className="ml-2" />
            </div>
            {dropdownOpen && (
              <div className="absolute bg-white text-black mt-2 rounded-md shadow-md w-full z-10">
                <div
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelection('triple')}
                >
                  Triple Sharing
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelection('double')}
                >
                  Double Sharing
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="h-48 overflow-y-auto text-sm">
          {details &&
            details.batch.map((tour, index) => (
              <div
                key={index}
                className="grid grid-cols-4 text-black border-b gap-2 md:gap-4"
              >
                <div className="p-2 col-span-1 text-black flex flex-col items-center">
                  <p>{tour.date}</p>
                  <p className="text-orange-500 whitespace-nowrap text-xs md:text-sm bg-orange-200 w-fit px-2 rounded md:rounded-md mt-2">
                    Filling Fast
                  </p>
                </div>
                <div className="p-2 col-span-3 text-black">
                  {tour.transports.map((vehicle, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 text-black gap-2"
                    >
                      <div className="mb-2 w-full flex justify-start items-center">
                        {vehicle.type}
                      </div>
                      <div className="mb-2 w-full flex justify-center items-center">
                        ₹
                        {sharingType === 'triple'
                          ? vehicle.costTripleSharing
                          : vehicle.costDoubleSharing}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

const TravelPackage = ({ destination }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [randomImages, setRandomImages] = useState([])
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const matchedDestination = Trips.find((trip) => trip.id === destination.id)
    setDetails(matchedDestination)
  }, [destination.id])

  const getUniqueImages = (media) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'] // List of valid image extensions
    const isImage = (url) => imageExtensions.some((ext) => url.endsWith(ext)) // Check if the URL ends with a valid image extension

    const images = media.filter((url) => isImage(url)) // Filter only images
    const uniqueSet = new Set()

    while (uniqueSet.size < 3 && uniqueSet.size < images.length) {
      const randomImage = images[Math.floor(Math.random() * images.length)]
      uniqueSet.add(randomImage) // Set will handle duplicates automatically
    }

    return Array.from(uniqueSet) // Convert Set back to Array
  }

  useEffect(() => {
    if (destination.images?.length) {
      setRandomImages(getUniqueImages(destination.images))
    }
  }, [destination?.id])
  // Function to open the modal
  const openModal = () => setModalOpen(true)

  // Function to close the modal
  const closeModal = () => setModalOpen(false)
  return (
    <div className="container mx-auto ">
      {/* Title */}
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-black">
          {destination.title} Overview
        </h2>
        <section className="my-12">
          <DescriptionWithReadMore destination={destination} />
        </section>
      </div>
      {/* Left Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Image Gallery */}
          <div className="flex space-x-4 mb-6">
            {randomImages.map((image, index) => (
              <div
                key={index}
                className="w-24 h-36 md:w-32 md:h-48 rounded-full overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={200}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Details Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-center">
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Pickup & Drop</p>
              <p className="text-blue-600">{details?.route}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Category</p>
              <p className="text-blue-600">{details?.category}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Duration</p>
              <p className="text-blue-600">{details?.duration}</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Age Group</p>
              <p className="text-blue-600">{details?.ageGroup}</p>
            </div>
          </div>

          {/* Inclusions */}
          <p className="my-4 text-black">Inclusions</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-yellow-600 p-4 flex justify-center items-center rounded-md text-center text-sm min-h-[80px]">
              <p>Meals</p>
            </div>
            <div className="bg-yellow-600 p-4 flex justify-center items-center rounded-md text-center text-sm min-h-[80px]">
              <p>Stays</p>
            </div>
            <div className="bg-yellow-600 p-4 flex justify-center items-center rounded-md text-center text-sm min-h-[80px]">
              <p>Transfers</p>
            </div>
            <div className="bg-yellow-600 p-4 flex justify-center items-center rounded-md text-center text-sm min-h-[80px]">
              <p>Qualified Captains</p>
            </div>
          </div>

          {/* Icons */}
          <div className="flex justify-around text-center space-x-4 text-black">
            <div className="flex flex-col gap-2 items-center">
              <div className="bg-blue-100 p-2 w-16 h-16 flex justify-center items-center rounded-full">
                <p className="text-3xl">🌍</p>
              </div>
              <p className="text-sm">
                Safe <br /> Travel
              </p>
            </div>
            <div className="flex flex-col gap-2  items-center">
              <div className="bg-blue-100 p-2 w-16 h-16 flex justify-center items-center rounded-full">
                <p className="text-3xl flex justify-center items-center mb-3">
                  💳
                </p>
              </div>
              <p className="text-sm">
                Flexible <br /> Cancellation
              </p>
            </div>
            <div className="flex flex-col gap-2  items-center">
              <div className="bg-blue-100 p-2 w-16 h-16 flex justify-center items-center rounded-full">
                <p className="text-3xl">💸</p>
              </div>
              <p className="text-sm">
                Affordable <br /> Prices
              </p>
            </div>
            <div className="flex flex-col gap-2  items-center">
              <div className="bg-blue-100 p-2 w-16 h-16 flex justify-center items-center rounded-full">
                <p className="text-3xl">📞</p>
              </div>
              <p className="text-sm">
                24/7 <br />
                Support
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          {/* Price and Discount */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-black">Starts From</p>
            {/* <div className="flex items-center space-x-2">
              <span className="text-red-500 line-through text-sm">₹9,000</span>
              <span className="bg-green-100 text-green-500 text-xs px-2 py-1 rounded-md">
                20% Off
              </span>
            </div> */}
            <p className="text-4xl font-bold text-blue-600 mt-2">
              ₹{details?.minPrice}{' '}
              {details?.optionSec && (
                <span className="text-sm text-black font-normal">
                  /{details.route}
                </span>
              )}
            </p>

            <p className="text-sm text-gray-500">Per Person</p>
          </div>

          {/* Availability Table */}
          <BookingTable details={details} />
          {details?.optionSec && (
            <div className="mt-4">
              <p className="text-4xl font-bold text-blue-600 mt-12">
                ₹{details?.optionSec.minPrice}{' '}
                {details?.optionSec && (
                  <span className="text-sm text-black font-normal">
                    /{details?.optionSec.route}
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500">Per Person</p>
              {details?.optionSec && (
                <div className="my-6">
                  <BookingTable details={details?.optionSec} />
                </div>
              )}
            </div>
          )}

          {/* Book Now Button */}
          <button
            onClick={openModal}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold mb-6"
          >
            Book Now
          </button>
        </div>
      </div>
      {isModalOpen && <TripModal onClose={closeModal} />}
    </div>
  )
}

const Itinerary = ({ shortItinerary, fullItinerary }) => {
  const [expandedDay, setExpandedDay] = useState(null)

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day)
  }

  return (
    <div className="bg-gray-50 p-2 md:p-6 w-full max-w-screen-xl mx-auto rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Itinerary</h2>
      <div className="space-y-4">
        {shortItinerary.map((item, index) => (
          <div
            key={index}
            className="p-1 md:p-3 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gray-100 text-gray-700 font-semibold rounded-md px-2 md:px-4 py-2 mr-1 md:mr-4 text-sm md:text-md whitespace-nowrap">
                  {item.day}
                </div>
                <div className="text-gray-800 text-sm md:text-md">
                  {item.description}
                </div>
              </div>
              <button
                onClick={() => toggleDay(item.day)}
                className="text-blue-500 font-medium text-sm md:text-md flex items-center justify-end min-w-12"
              >
                <span className="hidden md:block">
                  {expandedDay === item.day ? 'Show Less' : 'Show More'}
                </span>
                <CiCircleChevDown
                  className={`ml-1 transform transition-transform ${expandedDay === item.day ? 'rotate-180' : 'rotate-0'
                    } w-8 h-8`}
                />
              </button>
            </div>

            <div
              className={`transition-all duration-1000 ease-in-out overflow-hidden ${expandedDay === item.day
                ? 'max-h-[1000px] opacity-100'
                : 'max-h-0 opacity-0'
                }`}
            >
              {expandedDay === item.day && (
                <div className="mt-3 p-1 md:p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  <h3 className="font-semibold text-gray-800 ">
                    {fullItinerary[index].title}
                  </h3>
                  <p className="whitespace-pre-line">
                    {fullItinerary[index].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ImagesGrid = ({ images }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {images.map((media, index) => {
        const isVideo = /\.(mp4|webm)$/i.test(media) // Check if the media is a video
        return (
          <div key={index} className="mb-4 overflow-hidden rounded-lg">
            {isVideo ? (
              <video
                src={media}
                className="object-cover w-full h-full"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={media}
                width={1000}
                height={1000}
                alt={`Media item ${index + 1}`}
                className="object-cover w-full h-full"
                quality={80}
               
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
const ImagesSlider = ({ images }) => {
  return (
    <div className="p-4">
      <div className="overflow-x-scroll whitespace-nowrap scroll-smooth flex gap-4">
        {/* {images.map((image, index) => (
          <div
            key={index}
            className="inline-block mb-4 w-full max-w-[300px] flex-shrink-0"
          >
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-auto rounded-lg"
              quality={80}
              priority
            />
          </div>
        ))} */}
        {images.map((media, index) => {
          const isVideo = /\.(mp4|webm)$/i.test(media) // Check if the media is a video
          return (
            <div
              key={index}
              className="inline-block mb-4 w-full max-w-[300px] flex-shrink-0 min-h-[400px]"
            >
              {isVideo ? (
                <video
                  src={media}
                  className="object-cover w-full h-auto rounded-lg min-h-[400px]"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={media}
                  width={1000}
                  height={1000}
                  alt={`Media item ${index + 1}`}
                  className="object-cover w-full h-auto rounded-lg min-h-[400px]"
                  quality={80}
            
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const InclusionsExclusions = ({ inclusions, exclusions }) => {
  return (
    <div className="bg-green-100 w-full max-w-screen-xl mx-auto p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inclusions Column */}
        <div>
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Inclusions
          </h2>
          <ul className="space-y-3">
            {inclusions.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="h-3 w-3 bg-green-800 rounded-full mt-[6px] mr-3 flex-shrink-0"></span>
                <div className="text-gray-700">
                  <strong className="text-gray-800">{item.title}:</strong>{' '}
                  {item.description}
                </div>
              </div>
            ))}
          </ul>
        </div>

        {/* Exclusions Column */}
        <div>
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Exclusions
          </h2>
          <ul className="space-y-3">
            {exclusions.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="h-3 w-3 bg-green-800 rounded-full mt-[6px] mr-3 flex-shrink-0"></span>
                <div className="text-gray-700">
                  <strong className="text-gray-800">{item.title}:</strong>{' '}
                  {item.description}
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const ImportantPoints = ({ points }) => {
  return (
    <div className="bg-gray-100 w-full max-w-screen-xl mx-auto p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Important Points
      </h2>
      <div className="space-y-6">
        {points.map((point, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {point.title}
            </h3>
            <p className="text-gray-700">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const Testimonials = () => {
  const reviews = [
    {
      name: 'Priyanka Kashyap',
      date: 'Dec 25, 2024',
      rating: 5,
      review:
        'I took the Christmas package of Chopta-Tungnath trek through WanderOn. And I really feel grateful that I chose the right travelling community. Our entire trip was very smooth. Our captains - our Heroes Aaliya and Nitin executed everything very efficiently.',
      avatar: '/path/to/avatar1.jpg',
    },
    {
      name: 'Prachi Singhal',
      date: 'Dec 25, 2024',
      rating: 5,
      review:
        'We went on a trekking trip to Tungnath and Deoriatal with WanderOn, and it was just amazing. It was my 2nd experience with these guys, and this time again, their planning and arrangements were perfect.',
      avatar: '/path/to/avatar2.jpg',
    },
  ]

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6 space-y-8">
      {/* Testimonials Header */}
      <div className="text-center space-y-2">
        <p className="text-gray-500">The word on the street</p>
      </div>

      {/* Rating Icons */}
      <div className="flex justify-around md:justify-center md:space-x-10 items-center py-4">
        {[
          {
            icon: '/images/google_logo.webp',
            rating: 4.9,
            reviews: 120,
          },
          {
            icon: '/images/trip_logo.webp',
            rating: 4.9,
            reviews: 40,
          },
          {
            icon: '/images/facebook_logo.webp',
            rating: 5.0,
            reviews: 89,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-2 w-24 md:w-28"
          >
            <img
              src={item.icon}
              width={100}
              height={100}
              alt="Rating Icon"
              className="w-auto h-12 md:h-16 object-contain"
            />
            <p className="font-semibold text-black text-sm md:text-base">
              {item.rating} 🌟
            </p>
            <p className="text-gray-500 text-xs md:text-sm">
              ({item.reviews} reviews)
            </p>
          </div>
        ))}
      </div>

      {/* Review Cards */}
      {/* <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="relative flex flex-col bg-white p-6 rounded-lg shadow-lg border border-gray-100 transition-transform hover:scale-105 duration-300"
          >
            <div className="flex items-center mb-4">
              <Image
                src={review.avatar}
                width={50}
                height={50}
                alt="Avatar"
                className="w-14 h-14 rounded-full border-2 border-gray-200"
              />
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">{review.name}</h4>
                <div className="flex items-center space-x-1 text-yellow-500">
                  {Array(review.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                </div>
              </div>
            </div>

            <p className="text-gray-600 italic mb-6">{review.review}</p>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-gray-400 text-sm">{review.date}</p>
              <a href="#" className="text-blue-600 font-semibold text-sm">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div> */}
      <section>
        <div className="w-full max-w-lg mx-auto p-6 space-y-8">
          <img
            src="/images/reviews/review1.webp"
            alt="testimonial"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  )
}

const Page = ({ destination }) => {
  const [randomQuote, setRandomQuote] = useState('')
  const quotes = [
    'Adventures and memories',
    'Explore the unexplored',
    'Wander often, wonder always',
    'Life is short, travel more',
    'Collect moments, not things',
    "Discover nature's beauty",
    'Let the journey begin',
    'Adventure awaits',
    'Escape the ordinary',
    'Find your path',
  ]

  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  if (!destination) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-white  bg-gray-800">
        Destination not found
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center  text-white relative">
      {/* Hero Section */}
      <section
        className="relative w-full h-[calc(100vh-4rem)]  bg-cover bg-center bg-gray-500"
        style={{
          backgroundImage: `url('${destination.banners.web}')`,
        }}
      >
        {/* Top left glass effect text */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-white bg-opacity-20 text-white px-2 py-1 md:px-4 md:py-2 rounded-md backdrop-blur-lg">
          <p className="text-md font-light">&quot;{randomQuote}&quot;</p>
        </div>

        {/* Top right overlayed image */}
        <div className="absolute top-16 right-4 md:top-16 md:right-4 h-1/3 w-1/2 md:h-1/2 md:w-1/3 bg-cover rounded-lg overflow-hidden">
          <img
            src={destination.images[2]}
            alt="Place"
            width={400}
            height={400}
            className="w-full h-full  max-h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Small text below the right image */}
        <div className="absolute bottom-56 right-4 md:bottom-32 md:right-4 text-xs font-thin w-2/3 md:w-1/3 bg-black bg-opacity-30 text-gray-300 px-2 py-1 md:px-4 md:py-2 rounded-md backdrop-blur-sm">
          <p>{destination.metaDescription}</p>
        </div>

        {/* Overlapping circular images */}
        <div className="absolute bottom-28 right-4 md:bottom-12 md:right-16 flex -space-x-2">
          {destination.images.slice(1, 4).map((url, index) => {
            const isImage = /\.(jpg|jpeg|png|webp)$/i.test(url) // Check if the URL is an image
            return (
              <div
                key={index}
                className={`w-10 h-10 md:w-12 md:h-12 ${index === 0
                  ? 'bg-gray-400'
                  : index === 1
                    ? 'bg-gray-300'
                    : 'bg-gray-200'
                  } rounded-full overflow-hidden`}
              >
                {isImage ? (
                  <img
                    src={url}
                    alt={`Media ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <video
                    src={url}
                    controls={false}
                    autoPlay
                    loop
                    muted
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Place name at the bottom left */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
          <h1
            className="text-2xl md:text-5xl font-bold tracking-tight"
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            }}
          >
            {destination.headline}
          </h1>
        </div>
      </section>
      <section className="my-12 w-full">
        <TravelPackage destination={destination} />
      </section>
      <section className="my-12 w-full">
        <Itinerary
          shortItinerary={destination.shortItinerary}
          fullItinerary={destination.fullItinerary}
        />
      </section>
      <section className=" w-full">
        <img
          src="/images/homepage/gallery_font.svg"
          width={1000}
          height={1000}
          alt="gallery"
          className="w-full h-full object-cover p-4 max-w-screen-xl mx-auto"
        />
      </section>
      <section className="my-12 w-full hidden md:block">
        <ImagesGrid images={destination.images} />
      </section>
      <section className="my-12 w-full md:hidden">
        <ImagesSlider images={destination.images} />
      </section>
      <section className="my-12 w-full">
        <InclusionsExclusions
          inclusions={destination.inclusions}
          exclusions={destination.exclusions}
        />
      </section>
      <section className="my-12 w-full">
        <ImportantPoints points={destination.importantPoints} />
      </section>
      <section className="my-12 w-full">
        <Testimonials />
      </section>
    </div>
  )
}

export default Page
