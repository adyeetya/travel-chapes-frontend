import React from 'react';
import Link from 'next/link';
import { FaCalendarWeek, FaBiking, FaHiking } from 'react-icons/fa';
import { LuBackpack } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
const SpecialCategories = () => {
  const categories = [
    { 
      name: 'Backpacking',
      icon: <LuBackpack className="text-4xl" />,
      description: 'Explore offbeat destinations with just your essentials'
    },
    { 
      name: 'Weekend Trip',
      icon: <IoCalendarOutline className="text-4xl" />,
      description: 'Quick getaways packed with adventure and relaxation'
    },
    { 
      name: 'Biking Trip',
      icon: <FaBiking className="text-4xl" />,
      description: 'Feel the wind as you ride through scenic routes'
    },
    { 
      name: 'Treks',
      icon: <FaHiking className="text-4xl" />,
      description: 'Challenge yourself with breathtaking mountain trails'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Adventure Awaits</h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Discover your perfect adventure with our curated trip categories
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link 
            href={`/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
            key={category.name}
            className="group"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col items-center text-center border border-gray-100">
              <div className="bg-yellow-100 p-4 rounded-full mb-6 text-yellow-600 group-hover:bg-yellow-200 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {category.description}
              </p>
              <div className="mt-auto w-12 h-1 bg-yellow-400 rounded-full group-hover:w-16 transition-all duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialCategories;