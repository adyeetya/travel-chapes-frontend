'use client'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'
const TripModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    email: '',
    phone: '',
    travelers: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const sendToWhatsApp = () => {
    const message = `Hello, I would like to plan a trip.
Name: ${formData.name} 
Destination: ${formData.destination}
Email: ${formData.email}
Phone: ${formData.phone}
Number of Travelers: ${formData.travelers}`

    const whatsappURL = `https://wa.me/+918650500202?text=${encodeURIComponent(
      message
    )}`
    window.open(whatsappURL, '_blank')
  }

  const sendToEmail = () => {
    const subject = `Trip Planning Inquiry`
    const body = `Hello,\n\nI would like to plan a trip.\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nNumber of Travelers: ${formData.travelers}`

    const mailtoURL = `mailto:contact@travelchapes.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    window.open(mailtoURL, '_blank')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendToWhatsApp() // Or call sendToEmail()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-4/5 lg:max-w-4xl flex flex-col-reverse md:flex-row h-auto md:h-[65vh] lg:h-[90vh] max-h-[500px]">
        <button
          onClick={onClose}
          className="text-black z-50 absolute top-4 right-4 bg-red-300 rounded-full p-2 hover:bg-red-400 focus:outline-none"
        >
          <IoClose size={24} />
        </button>

        {/* Left Form Section */}
        <div className="md:w-1/2 p-6 h-full overflow-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">
            PLAN YOUR NEXT TRIP
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-xs md:text-sm mb-2 sr-only">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs md:text-sm mb-2 sr-only">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Destination"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs md:text-sm mb-2 sr-only">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs md:text-sm mb-2 sr-only">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-xs md:text-sm mb-2 sr-only">
                Number of Travelers
              </label>
              <input
                type="number"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                placeholder="Number of Travelers"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white mt-6 py-3 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Start Journey
            </button>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 h-56 md:h-full relative">
          <Image
            src="/images/homepage/modalimg.jpg" // Replace with your image URL
            alt="Trip Preview"
            width={1000}
            height={1000}
            className="object-cover w-full h-full rounded-lg md:rounded-l-none md:rounded-r-lg"
          />
          <div className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50 text-white text-center">
            <h3 className="text-lg font-semibold">We are a Family</h3>
            <p className="text-sm">
              In camp we have a lot of people with different life stories that
              help you feel more at home during the trip.
            </p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {['#adventure', '#explore', '#family', '#travel'].map((tag) => (
                <span
                  key={tag}
                  className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripModal
