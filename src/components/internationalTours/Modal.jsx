'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'

const TourModal = ({
  selectedTour,
  formData,
  handleChange,
  handleSubmit,
  closeModal,
}) => {
  useEffect(() => {
    // Lock scrolling on mount
    document.body.style.overflow = 'hidden'

    return () => {
      // Restore scrolling on unmount
      document.body.style.overflow = ''
    }
  }, [])
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-4/5 lg:max-w-4xl flex flex-col md:flex-row h-auto md:h-[65vh] lg:h-[90vh] max-h-[665px]">
        <button
          onClick={closeModal}
          className="text-black z-50 absolute top-4 right-4 bg-red-300 rounded-full p-2 hover:bg-red-400 focus:outline-none"
        >
          <IoClose size={24} />
        </button>
        {/* Left Image Section */}
        <div className="relative h-48 md:h-full md:w-1/2">
          <img
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
              <label className="block text-gray-700 text-sm mb-2">Name</label>
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
              <label className="block text-gray-700 text-sm mb-2">Email</label>
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
              Enquire
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TourModal
