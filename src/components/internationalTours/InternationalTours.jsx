'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IoStarSharp, IoStarHalfSharp, IoClose } from 'react-icons/io5'

const tours = [
  {
    id: 1,
    name: 'Bali',
    rating: 4.5,
    image: '/images/homepage/bali_cover.svg',
    link: '/tours/paris',
  },
  {
    id: 2,
    name: 'Kazakhstan',
    rating: 4.7,
    image: '/images/homepage/kazakistan_cover.svg',
    link: '/tours/tokyo',
  },
  {
    id: 3,
    name: 'Thailand',
    rating: 4.8,
    image: '/images/homepage/thailand_cover.svg',
    link: '/tours/new-york',
  },
  {
    id: 4,
    name: 'Vietnam',
    rating: 4.6,
    image: '/images/homepage/vietnam_cover.svg',
    link: '/tours/sydney',
  },
]

const InternationalTours = () => {
  const [selectedTour, setSelectedTour] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    days: '',
  })

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    return (
      <div className="flex items-center justify-center space-x-1 bg-opacity-60 p-1 rounded-md">
        {Array.from({ length: fullStars }).map((_, index) => (
          <IoStarSharp key={index} className="text-white w-4 h-4" />
        ))}
        {hasHalfStar && <IoStarHalfSharp className="text-gray-200 w-4 h-4" />}
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const sendToWhatsApp = () => {
    const message = `Hello, I would like to book a trip to ${selectedTour.name}.
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Number of Days: ${formData.days}`

    const whatsappURL = `https://wa.me/+918650500202?text=${encodeURIComponent(
      message
    )}`
    window.open(whatsappURL, '_blank')
  }

  const sendToEmail = () => {
    const subject = `Booking Inquiry for ${selectedTour.name}`
    const body = `Hello,\n\nI would like to book a trip to ${selectedTour.name}.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nNumber of Days: ${formData.days}`

    const mailtoURL = `mailto:contact@travelchapes.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    window.open(mailtoURL, '_blank')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Choose either WhatsApp or email sending here, or let the user decide
    sendToWhatsApp() // Or call `sendToEmail()`
  }

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold my-4">International Tours</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-12">
        {tours.map((tour) => (
          <div
            key={tour.id}
            onClick={() => setSelectedTour(tour)}
            className="relative group cursor-pointer"
          >
            <div className="h-64 w-full overflow-hidden rounded-lg shadow-lg relative">
              <Image
                src={tour.image}
                alt={tour.name}
                width={1000}
                height={1000}
                className="group-hover:scale-110 transition-transform duration-300 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-white text-2xl font-bold">{tour.name}</h2>
                <div className="flex items-center mt-2">
                  {renderStars(tour.rating)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-4/5 lg:max-w-4xl flex flex-col md:flex-row h-auto md:h-[65vh] lg:h-[90vh] max-h-[665px]">
            <button
              onClick={() => setSelectedTour(null)}
              className="text-black z-50 absolute top-4 right-4 bg-red-300 rounded-full p-2 hover:bg-red-400 focus:outline-none"
            >
              <IoClose size={24} />
            </button>
            {/* Left Image Section */}
            <div className="relative h-48 md:h-full md:w-1/2">
              <Image
                src={selectedTour.image}
                alt={selectedTour.name}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Form Section */}
            <div className="p-4 md:p-6 w-full md:w-1/2 relative h-full overflow-auto">
              <h2 className="text-2xl font-bold mb-4">
                Plan Your Trip to {selectedTour.name}
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={selectedTour.name}
                    readOnly
                    className="w-full border rounded-md p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onChange={handleChange}
                    value={formData.phone}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    name="days"
                    placeholder="Enter number of days"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onChange={handleChange}
                    value={formData.days}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-full mt-4 hover:bg-red-600 transition-all duration-300"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InternationalTours
