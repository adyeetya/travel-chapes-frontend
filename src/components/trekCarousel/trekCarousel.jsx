'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import topTreks from '@/data/treks.js'
import { IoStarSharp, IoStarHalfSharp, IoClose } from 'react-icons/io5'

import { useState, useEffect } from 'react'
import Card from '../common/Card'

// Dummy modal component for inquiry
const BookingModal = ({
  selectedTrek,
  onClose,
  formData,
  handleChange,
  handleSubmit,
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
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-4/5 lg:max-w-4xl flex flex-col md:flex-row h-auto md:h-[65vh] lg:h-[90vh] max-h-[565px]">
        <button
          onClick={onClose}
          className="text-black z-50 absolute top-4 right-4 bg-red-300 rounded-full p-2 hover:bg-red-400 focus:outline-none"
        >
          <IoClose size={24} />
        </button>
        <div className="relative h-48 md:h-full md:w-1/2">
          <Image
            src={selectedTrek.image}
            alt={selectedTrek.name}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 md:p-6 w-full md:w-1/2 relative overflow-y-auto max-h-[565px]">
          <form
            className="space-y-4 flex flex-col h-full justify-between"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-4">
              Plan Your Trip to {selectedTrek.name}
            </h2>
            <div>
              <input
                type="text"
                value={selectedTrek.name}
                readOnly
                className="w-full border rounded-md p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
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
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-full mt-4 hover:bg-red-600 transition-all duration-300"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
const TopTreks = ({ treks }) => {
  const [selectedTrek, setSelectedTrek] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const sendToWhatsApp = () => {
    const message = `Hello, I would like to book a trip to ${selectedTrek.name}.
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
`

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
    setFormData({ name: '', email: '', phone: '' })
    // Choose either WhatsApp or email sending here, or let the user decide
    sendToWhatsApp() // Or call `sendToEmail()`
  }
  return (
    <div>
      <section className="py-12">
        <h2 className="text-2xl text-left mb-4">Our Top Treks</h2>
        <Carousel opts={{ align: 'start' }} className="w-full">
          <CarouselContent className="">
            {topTreks.map((trip) => (
              <CarouselItem
                key={trip.name}
                className="w-full sm:basis-1/2 md:basis-1/3 flex-shrink-0"
              >
                <div
                  className="border-2 rounded-xl relative h-[450px] flex flex-col justify-end bg-cover bg-center cursor-pointer"
                  onClick={() => setSelectedTrek(trip)}
                  style={{
                    backgroundImage: `url('${trip.image}')`,
                  }}
                >
                  {/* Glass effect text overlay */}
                  <div className="relative z-20 bg-black/10 brightness-90 backdrop-blur-md rounded-b-xl p-4">
                    <h3 className="text-lg font-semibold text-white hover:underline cursor-pointer">
                      {trip.name}
                    </h3>

                    <p className="text-sm md:text-md text-white overflow-hidden text-ellipsis">
                      {trip.location}
                    </p>
                    <p className="text-sm md:text-md text-white overflow-hidden text-ellipsis">
                      {trip.height}
                    </p>
                    <p className="text-sm md:text-md text-white overflow-hidden text-ellipsis">
                      {trip.distance}
                    </p>
                    <p className="text-sm md:text-md text-white overflow-hidden text-ellipsis">
                      {trip.duration}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {selectedTrek && (
        <BookingModal
          selectedTrek={selectedTrek}
          onClose={() => setSelectedTrek(null)}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

const TrekCarousel = ({ destinations }) => {
  const treks = destinations.filter((trip) => trip.category.includes('trek'))

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 justify-start md:justify-between items-start md:items-center">
        <h2 className="text-3xl text-left font-bold my-4">Our Best Treks</h2>
        <p className="max-w-lg">
          Discover India&apos;s Most Breathtaking Trails. From Himalayan Peaks
          to Hidden Valleys Where Every Trail Tells a Story. Experience
          India&apos;s Majestic Wilderness from Ancient Paths to Epic
          Adventures.
        </p>
      </div>
      <div className="my-12">
        <Card data={treks} noOfCards={3} />
      </div>
      <section className="my-12">
        <TopTreks />
      </section>
    </div>
  )
}

export default TrekCarousel
