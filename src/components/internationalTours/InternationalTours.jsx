'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoStarSharp, IoStarHalfSharp } from 'react-icons/io5';
import TourModal from './Modal';

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
];

const InternationalTours = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    days: '',
  });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center justify-center space-x-1 bg-opacity-60 p-1 rounded-md">
        {Array.from({ length: fullStars }).map((_, index) => (
          <IoStarSharp key={index} className="text-yellow-400 w-4 h-4" />
        ))}
        {hasHalfStar && <IoStarHalfSharp className="text-yellow-400 w-4 h-4" />}
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendToWhatsApp = () => {
    const message = `Hello, I would like to book a trip to ${selectedTour.name}.
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Number of Days: ${formData.days}`;

    const whatsappURL = `https://wa.me/+918650500202?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendToWhatsApp();
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold text-center my-8 text-gray-800">
        Explore International Tours
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
        {tours.map((tour) => (
          <div
            key={tour.id}
            onClick={() => setSelectedTour(tour)}
            className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-300"
          >
            <div className="h-64 w-full overflow-hidden rounded-xl shadow-lg relative">
              <Image
                src={tour.image}
                alt={tour.name}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
                <h2 className="text-white text-2xl font-bold text-center">
                  {tour.name}
                </h2>
                <div className="flex items-center mt-2">
                  {renderStars(tour.rating)}
                </div>
                <button className="mt-4 px-6 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTour && (
        <TourModal
          selectedTour={selectedTour}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={() => setSelectedTour(null)}
        />
      )}
    </div>
  );
};

export default InternationalTours;