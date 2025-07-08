'use client'
import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'
import { submitTripQuery } from './tripQueryController'

const TripModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    phone: '',
    email: '',
    travelers: '',
  })
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: '', success: false })

  useEffect(() => {
    // Lock scrolling on mount
    document.body.style.overflow = 'hidden'

    return () => {
      // Restore scrolling on unmount
      document.body.style.overflow = ''
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const sendToWhatsApp = () => {
    const message = `Hello, I would like to plan a trip.
Name: ${formData.name}
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
    const body = `Hello,\n\nI would like to plan a trip.\n\nName: ${formData.name} \nEmail: ${formData.email}\nPhone: ${formData.phone}\nNumber of Travelers: ${formData.travelers}`

    const mailtoURL = `mailto:contact@travelchapes.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    window.open(mailtoURL, '_blank')
  }

  const makeCall = () => {
    const phoneNumber = '+918851629108'
    window.open(`tel:${phoneNumber}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: '', success: false });
    const result = await submitTripQuery(formData);
    if (result.success) {
      setSubmitStatus({ loading: false, error: '', success: true });
      setFormData({ name: '', destination: '', phone: '', email: '', travelers: '' });
      // Optionally close modal or show a success message
    } else {
      setSubmitStatus({ loading: false, error: result.error, success: false });
    }
  }

  // Helper to submit query before external action
  const handleActionWithQuery = async (actionFn) => {
    setSubmitStatus({ loading: true, error: '', success: false });
    const result = await submitTripQuery(formData);
    if (result.success) {
      setSubmitStatus({ loading: false, error: '', success: true });
      setFormData({ name: '', destination: '', phone: '', email: '', travelers: '' });
    } else {
      setSubmitStatus({ loading: false, error: result.error, success: false });
    }

    setSubmitStatus({ loading: false, error: '', success: false });
    actionFn();
   

  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-4/5 lg:max-w-4xl flex flex-col-reverse md:flex-row h-auto md:h-[65vh] lg:h-[90vh] max-h-[500px]">
        <button
          onClick={onClose}
          className="text-black z-50 absolute top-4 right-4 bg-red-50 rounded-full p-2 hover:bg-red-400 focus:outline-none"
        >
          <IoClose size={24} />
        </button>

        {/* Left Form Section */}
        <div className="md:w-1/2 p-6 h-full overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="md:text-xl md:font-bold text-black">
              PLAN YOUR NEXT TRIP
            </h2>
            <div className=" z-50">
              <button
                onClick={makeCall}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Call Us
              </button>
            </div>
          </div>

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
                className="w-full border text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                className="w-full border text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                className="w-full border text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                className="w-full border text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                className="w-full text-black border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Feedback message */}
            {/* {submitStatus.error && (
              <div className="text-red-500 text-sm">{submitStatus.error}</div>
            )}
            {submitStatus.success && (
              <div className="text-green-600 text-sm text-center">Your query has been submitted and we will contact you soon.</div>
            )} */}

            {/* Buttons for WhatsApp and Email */}
            <div className="flex flex-row gap-4 justify-between items-center mt- w-full">
              <button
                onClick={() => handleActionWithQuery(sendToWhatsApp)}
                type="button"
                className="w-1/2 border border-green-500 text-black hover:text-white px-4 py-2 rounded-full hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={submitStatus.loading}
              >
                {submitStatus.loading ? 'Submitting...' : 'WhatsApp'}
              </button>
              <button
                onClick={() => handleActionWithQuery(sendToEmail)}
                type="button"
                className="w-1/2 border border-yellow-500 text-black hover:text-white px-4 py-2 rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                disabled={submitStatus.loading}
              >
                {submitStatus.loading ? 'Submitting...' : 'Email'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 h-56 md:h-full relative">
          {/* laptop image */}
          <img
            src="/images/himachal/himachal_banner_both.webp" // Replace with your image URL
            alt="Trip Preview"
            width={1000}
            height={1000}
            className="object-cover hidden md:block w-full h-full rounded-lg md:rounded-l-none md:rounded-r-lg"
          />
          {/* mobile image */}
          <img
            src="/images/himachal/himachal_banner_both.webp" // Replace with your image URL
            alt="Trip Preview"
            width={1000}
            height={1000}
            className="object-cover md:hidden w-full h-full rounded-lg md:rounded-l-none md:rounded-r-lg"
          />
          <div className="absolute bottom-0 w-full p-4 md:ml-1 bg-black bg-opacity-50 text-white text-center">
            <h3 className="text-sm md:text-lg font-semibold">
              We are a Family
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm">
              In camp we have a lot of people with different life stories that
              help you feel more at home during the trip.
            </p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {[
                '#happytravel',
                '#adventure',
                '#explore',
                '#family',
                '#travel',
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-yellow-500 text-black px-2 py-1 rounded-full text-[10px] sm:text-xs"
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
