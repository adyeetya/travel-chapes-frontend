'use client'
import React, { useState, use, useEffect } from 'react'

import { CiCircleChevDown } from 'react-icons/ci'
import BookingModal from './BookingModal'
import { FaCaretDown } from 'react-icons/fa'
import { TripModal } from '@/components/TripModal/TripModal'
import { downloadItineraryPDF } from './downloadItineraryPDF'
import { set } from 'react-hook-form'
import { Badge } from '@/components/ui/badge'
import { Star, Clock, Users, Mountain, MapPin, PhoneIcon, MessageCircleMore } from "lucide-react"
import Link from 'next/link'
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
        <div className="prose max-w-none text-black">
          <div dangerouslySetInnerHTML={{
            __html: isExpanded
              ? destination.description
              : `${truncatedDescription}...`
          }} />
          {destination.description.length > 200 && (
            <span
              onClick={handleToggleExpand}
              className="text-blue-500 hover:text-blue-700 cursor-pointer ml-2"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </span>
          )}
        </div>
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
        <p className="text-black">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: item.description }}
          /></p>
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

  if (!details?.length) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-lg text-gray-800 mb-4">No batches are currently available for this destination.</p>
        <div className="flex justify-center gap-4">
          <a
            href="tel:+918650500202"
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-700"
          >
            <span>📞</span> Call Us
          </a>
          <a
            href="https://wa.me/918650500202"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-700"
          >
            <span>💬</span> WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // Check if any batch has single sharing available
  const hasSingleSharing = details.some(batch =>
    Object.values(batch.pricing).some(vehiclePricing => vehiclePricing.single > 0)
  );

  return (
    <div>
      <div className="bg-gray-100 h-56 mb-4 rounded-lg overflow-hidden">
        <div className="flex bg-yellow-600 text-white sticky top-0 gap-2 text-sm w-full">
          <div className="flex-1 p-2 rounded-tl-lg flex justify-start items-center">
            Batches
          </div>

          <div className="flex-1 p-2 whitespace-nowrap flex justify-start items-center">
            Mode of Vehicle
          </div>

          <div className="flex-1 p-2 whitespace-nowrap relative">
            <div
              className="bg-yellow-600 text-white px-2 py-1 rounded-md flex items-center cursor-pointer justify-between"
              onClick={toggleDropdown}
            >
              {sharingType === 'single'
                ? 'Single Sharing'
                : sharingType === 'double'
                  ? 'Double Sharing'
                  : 'Triple Sharing'}
              <FaCaretDown className="ml-2" />
            </div>
            {dropdownOpen && (
              <div className="absolute bg-white text-black mt-2 rounded-md shadow-md w-full z-10">
                {hasSingleSharing && (
                  <div
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelection('single')}
                  >
                    Single Sharing
                  </div>
                )}
                <div
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelection('double')}
                >
                  Double Sharing
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelection('triple')}
                >
                  Triple Sharing
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-48 overflow-y-auto text-sm">
          {details.map((batch, index) => (
            <div
              key={batch._id}
              className="grid grid-cols-4 text-black border-b gap-2 md:gap-4"
            >
              <div className="p-2 col-span-1 text-black flex flex-col items-center">
                <p>{new Date(batch.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                <p className="text-orange-500 whitespace-nowrap text-xs md:text-sm bg-orange-200 w-fit px-2 rounded md:rounded-md mt-2">
                  Filling Fast
                </p>
              </div>
              <div className="p-2 col-span-3 text-black">
                {Object.entries(batch.pricing).map(([vehicleType, prices], idx) => (
                  <div
                    key={`${batch._id}-${idx}`}
                    className="grid grid-cols-2 text-black gap-2"
                  >
                    <div className="mb-2 w-full flex justify-start items-center">
                      {vehicleType.toUpperCase()}
                    </div>
                    <div className="mb-2 w-full flex justify-center items-center">
                      ₹
                      {sharingType === 'single'
                        ? prices.single || 'N/A'
                        : sharingType === 'double'
                          ? prices.double
                          : prices.triple}
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

const TravelPackage = ({ destination, batch }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [sharingType, setSharingType] = useState('triple');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [details, setDetails] = useState(null);

  // Calculate minPrice from the pricing data and prepare batch details
  useEffect(() => {
    if (destination && batch) {
      let minPrice = Infinity;

      batch.forEach(batchItem => {
        Object.values(batchItem.pricing).forEach(vehiclePricing => {
          if (vehiclePricing.single > 0) minPrice = Math.min(minPrice, vehiclePricing.single);
          if (vehiclePricing.double > 0) minPrice = Math.min(minPrice, vehiclePricing.double);
          if (vehiclePricing.triple > 0) minPrice = Math.min(minPrice, vehiclePricing.triple);
        });
      });

      const duration = destination.duration ||
        (destination.fullItinerary ? destination.fullItinerary.length : 0);

      setDetails({
        route: destination.pickup,
        category: Array.isArray(destination.category) ?
          destination.category.join(", ") :
          destination.category || 'Adventure',
        duration: `${duration} Days`,
        ageGroup: '18-45',
        meals: destination.meals || [],
        minPrice: destination.minPrice || minPrice,
        gst: batch[0]?.gst || 5,
      });
    }
  }, [destination, batch]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleSelection = (type) => {
    setSharingType(type);
    setDropdownOpen(false);
  };

  const openBookingModal = () => setBookingModal(true);
  const closeBookingModal = () => setBookingModal(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleDownloadPDF = async () => {
    await downloadItineraryPDF({
      destination,
      details,
      itinerary: destination.fullItinerary,
      images: destination.images || [],
    });
  };

  // Check if any batch has single sharing available
  const hasSingleSharing = batch?.some(batch =>
    Object.values(batch.pricing).some(vehiclePricing => vehiclePricing.single > 0)
  );

  return (
   <div className="container mx-auto px-2 md:px-4 text-black pb-20 md:pb-0"> {/* Added padding-bottom for mobile */}
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Left Content */}
    <div className="md:w-2/3 bg-re">
      <section className="rounded-lg bg-white md:p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Trip Overview</h2>
        <div
          dangerouslySetInnerHTML={{ __html: destination.description }}
          className="text-gray-700 text-xs md:text-base leading-relaxed line-clamp-3 md:line-clamp-none"
        />
        {/* Read More button for mobile */}
        <button className="md:hidden text-blue-600 text-sm mt-2">
          Read More
        </button>

        {destination.fullItinerary && destination.fullItinerary.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Trip Highlights</h3>
              <button
                onClick={handleDownloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium"
              >
                Download Itinerary PDF
              </button>
            </div>
            <ul className="space-y-2">
              {destination.fullItinerary.slice(0, 5).map((day, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-gray-700">{day.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      
      {/* Gallery and Itinerary sections */}
      <h2 className='text-2xl text-center font-semibold w-full'>Gallery</h2>
      <section className="my-8 w-full hidden md:block">
        <ImagesGrid images={destination.images} />
      </section>
      <section className="my-8 w-full md:hidden">
        <ImagesSlider images={destination.images} />
      </section>
      <section className="my-8 w-full">
        <Itinerary fullItinerary={destination.fullItinerary} />
      </section>
    </div>

    {/* Right Sidebar - Sticky Booking Section */}
    <div className="md:w-1/3 bg-r">
      <div className="md:sticky md:top-12  space-y-6">
        <div className="bg-white px-2 md:p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <p className="text-lg font-semibold">Starts From</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              ₹{(details?.minPrice || 0).toLocaleString()}
              <span className="text-sm text-gray-600 ml-1">+ {details?.gst || 5}% GST</span>
            </p>
            <p className="text-sm text-gray-500">Per Person</p>
          </div>

          {/* Booking Buttons - Hidden on mobile (will show in fixed bottom bar) */}
          <div className="space-y-4 hidden md:block">
            {batch?.length ? (
              <button
                onClick={openBookingModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                Book Now
              </button>
            ) : (
              <button
                onClick={openModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                Enquire Now
              </button>
            )}
          </div>
        </div>

        {/* Batches Section */}
          {batch?.length ? (
              <div className="bg- p-3 rounded-lg shadow-sm ">
                <h3 className="text-lg font-semibold mb-4">Available Batches</h3>

                {/* Sharing Type Selector */}
                <div className="mb-2">
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center justify-between border border-blue-200"
                    >
                      <span>
                        {sharingType === 'single' ? 'Single Sharing' :
                          sharingType === 'double' ? 'Double Sharing' : 'Triple Sharing'}
                      </span>
                      <FaCaretDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-blue-200 rounded-lg shadow-lg">
                        {hasSingleSharing && (
                          <button
                            onClick={() => handleSelection('single')}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50"
                          >
                            Single Sharing
                          </button>
                        )}
                        <button
                          onClick={() => handleSelection('double')}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50"
                        >
                          Double Sharing
                        </button>
                        <button
                          onClick={() => handleSelection('triple')}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded-b-lg"
                        >
                          Triple Sharing
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Batch List */}
                <div className="space-y-2 max-h-60 -red-500 overflow-y-auto">
                  {batch.map((batchItem) => (
                    <div key={batchItem._id} className="border border-blue-100 rounded-lg p-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-blue-800">
                          {new Date(batchItem.startDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 rounded-full">
                          Filling Fast
                        </span>
                      </div>

                      <div className="space-y-2">
                        {Object.entries(batchItem.pricing).map(([vehicleType, prices]) => (
                          <div key={vehicleType} className="flex justify-between items-center">
                            <span className="text-xs text-gray-700">{vehicleType.toUpperCase()}</span>
                            <span className="font-medium text-blue-600">
                              ₹{prices[sharingType]?.toLocaleString() || 'N/A'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-100">
                <p className="text-blue-800 mb-4">No batches are currently available for this destination.</p>
                <div className="flex flex-col space-y-3">
                  <a
                    href="tel:+918650500202"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    Call Us
                  </a>
                  <a
                    href="https://wa.me/918650500202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
                  >
                    <MessageCircleMore className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            )}
      </div>
    </div>
  </div>

  {/* Mobile Fixed Bottom Bar */}
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 z-50">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium">From ₹{(details?.minPrice || 0).toLocaleString()}</p>
        <p className="text-xs text-gray-500">+ {details?.gst || 5}% GST</p>
      </div>
      {batch?.length ? (
        <button
          onClick={openBookingModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-sm"
        >
          Book Now
        </button>
      ) : (
        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-sm"
        >
          Enquire Now
        </button>
      )}
    </div>
  </div>

  {/* Modals */}
  {isModalOpen && <TripModal destination={destination.title} onClose={closeModal} />}
  {bookingModal && <BookingModal destination={destination} batches={batch} onClose={closeBookingModal} />}
</div>
  );
};



const Itinerary = ({ fullItinerary }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="bg-gray-50 p-2 md:p-2 w-full max-w-screen-xl mx-auto rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Itinerary</h2>
      <div className="space-y-4">
        {fullItinerary.map((item, index) => (
          <div
            key={index}
            className="p-1 md:p-3 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm md:text-md text-gray-600 font-medium">
                  {item.day}
                </span>
                <h3 className="text-gray-800 text-md md:text-lg font-semibold">
                  {item.title}
                </h3>
              </div>
              <button
                onClick={() => toggleDay(item.day)}
                className="text-blue-500 font-medium text-sm md:text-md flex items-center justify-end min-w-12"
              >
                <span className="hidden md:block">
                  {expandedDay === item.day ? "Show Less" : "Show More"}
                </span>
                <CiCircleChevDown
                  className={`ml-1 transform transition-transform ${expandedDay === item.day ? "rotate-180" : "rotate-0"
                    } w-8 h-8`}
                />
              </button>
            </div>

            <div
              className={`transition-all duration-700 ease-in-out overflow-hidden ${expandedDay === item.day
                ? "max-h-[1000px] opacity-100 mt-2"
                : "max-h-0 opacity-0"
                }`}
            >
              {expandedDay === item.day && (
                <div className="p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



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

const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

const InclusionsExclusions = ({ inclusions, exclusions }) => {
  const [activeTab, setActiveTab] = useState('inclusions');

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:p-6 rounded-lg shadow-md border border-gray-200 bg-white">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('inclusions')}
          className={`px-4 py-2 font-medium text-sm md:text-base transition-colors duration-200 ${activeTab === 'inclusions'
            ? 'text-blue-600 border-b-2 border-blue-600 bg-gray-50 rounded'
            : 'text-gray-500 hover:text-blue-500 bg-gray-200 rounded'
            }`}
        >
          Inclusions
        </button>
        <button
          onClick={() => setActiveTab('exclusions')}
          className={`px-4 py-2 font-medium text-sm md:text-base transition-colors duration-200 ${activeTab === 'exclusions'
            ? 'text-blue-600 border-b-2 border-blue -600 bg-gray-50 rounded'
            : 'text-gray-500 hover:text-blue-500 bg-gray-200 rounded'
            }`}
        >
          Exclusions
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === 'inclusions' ? (
          <ul className="space-y-4">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start group">
                <span className="h-5 w-5 bg-blue-600 rounded-full mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className="text-gray-700">
                  <strong className="text-gray-800 font-medium">{item.title}:</strong>{' '}
                  {isHTML(item.description) ? (
                    <span
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  ) : (
                    item.description
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-4">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start group">
                <span className="h-5 w-5 bg-gray-200 rounded-full mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className="text-gray-700">
                  <strong className="text-gray-800 font-medium">{item.title}:</strong>{' '}
                  {isHTML(item.description) ? (
                    <span
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  ) : (
                    item.description
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

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
            {isHTML(point.description) ? (
              <div
                className="text-gray-700 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: point.description }}
              />
            ) : (
              <p className="text-gray-700">{point.description}</p>
            )}
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

const Page = ({ destination, batch }) => {
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
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center  text-black relative">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gray-500">
          <img
            src={destination.banners?.web || "/placeholder.svg"}
            alt={destination.headline}
            className="object-cover w-full h-full"

          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <div className="container mx-auto px-4">
            {/* Badge for category */}
            <Badge className="mb-2" style={{ backgroundColor: "#fbc31f", color: "#183863" }}>
              {destination.category || "Adventure"}
            </Badge>

            {/* Destination title */}
            <h1 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
              {destination.headline}
            </h1>

            {/* Trip details */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{destination.rating || '4+'}</span>
                <span>({destination.review_count || '100+'} reviews)</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{destination.duration || destination.fullItinerary?.length || 0} Days</span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{destination.route || "Various Locations"}</span>
              </div>

              <div className="flex items-center gap-1">
                <Mountain className="h-4 w-4" />
                <span>{destination.altitude || "High Altitude"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="border-b bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-navy-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/destinations" className="hover:text-navy-600">
              Destinations
            </Link>
            <span>/</span>
            <span className="font-medium" style={{ color: "#183863" }}>
              {destination.headline}
            </span>
          </div>
        </div>
      </section>

      <section className=" md:my-12 w-full">
        <TravelPackage destination={destination} batch={batch} />
      </section>
      {/* <section className="my-12 w-full">
        <Itinerary

          fullItinerary={destination.fullItinerary}
        />
      </section> */}
      {/* <section className=" w-full">
       <img
          src="/images/homepage/gallery_font.svg"
          width={1000}
          height={1000}
          alt="gallery"
          className="w-full h-full object-cover p-4 max-w-screen-xl mx-auto"
        /> 
        
      </section> */}
      {/* <section className="my-12 w-full hidden md:block">
        <ImagesGrid images={destination.images} />
      </section>
      <section className="my-12 w-full md:hidden">
        <ImagesSlider images={destination.images} />
      </section> */}
      <section className=" md:my-12 w-full">
        <InclusionsExclusions
          inclusions={destination.inclusions}
          exclusions={destination.exclusions}
        />
      </section>
      <section className="md:my-12 w-full">
        <ImportantPoints points={destination.importantPoints} />
      </section>
      <section className="md:my-12 w-full">
        <Testimonials />
      </section>
    </div>
  )
}

export default Page
