import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  FaChevronRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[#] pt-8 pb-4 relative">
      {/* Background image with noise */}
      <div className="absolute inset-0 bg-black text-white bg-cover bg-center -z-10"></div>
      <div className="flex flex-col md:flex-row text-center max-w-screen-xl mx-auto">
        <div className="w-full md:w-1/2 flex flex-col items-start justify-between px-4 mb-4">
          <div className="flex flex-col gap-4 w-3/4">
            {/* Images and Text Section */}
            <div className="flex justify-start items-center gap-2 z-10">
              <Image
                src="/images/logo.png"
                width={1000}
                height={1000}
                alt="Image 1"
                className="w-16 h-auto"
              />
              <h1 className="text-white font-bold text-lg">Travel Chapes</h1>
            </div>
            {/* social links */}
            <div className="z-10">
              <ul className="flex justify-start space-x-4 md:space-x-8">
                <li className="bg-white rounded-full w-8 h-8 flex justify-center items-center">
                  <a
                    href="https://www.facebook.com/Travelchapes/"
                    className=" "
                  >
                    <FaFacebookF className="text-gray-900 w-6 h-6" />
                  </a>
                </li>
                <li className="bg-white rounded-full w-8 h-8 flex justify-center items-center">
                  <a
                    href="https://twitter.com/TravelChapes"
                    className="hover:underline"
                  >
                    <FaTwitter className="text-gray-900 w-6 h-6" />
                  </a>
                </li>
                <li className="bg-white rounded-full w-8 h-8 flex justify-center items-center">
                  <a
                    href="https://www.instagram.com/travel_chapes/"
                    className="hover:underline"
                    target="_blank"
                  >
                    <FaInstagram className="text-gray-900 w-6 h-6" />
                  </a>
                </li>
                <li className="bg-white rounded-full w-8 h-8 flex justify-center items-center">
                  <a
                    href="https://in.linkedin.com/company/travel-chapes"
                    className="hover:underline"
                  >
                    <FaLinkedinIn className="text-gray-900 w-6 h-6" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* address */}
          <div className="text-white text-left md:text-lg my-2 z-50">
            <h2>Let&apos;s add spotlight to our endless Travels.</h2>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col w-full md:w-1/2 px-4  md:items-center md:justify-center gap-8 z-10">
          <div className="text-white text-sm md:text-base flex flex-row justify-between md:justify-center gap-3 md:gap-8 text-right">
            <div>
              <ul>
                <li className="my-2">
                  <Link
                    href="/our-team"
                    className="hover:underline flex items-center whitespace-nowrap"
                  >
                    <FaChevronRight className="mr-2 w-2" /> About Us
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    href="/contact-us"
                    className="hover:underline flex items-center whitespace-nowrap"
                  >
                    <FaChevronRight className="mr-2 w-2" />
                    Contact Us
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    href="/christmas-new-year-special"
                    className="hover:underline flex items-center whitespace-nowrap"
                  >
                    <FaChevronRight className="mr-2 w-2" /> Christmas Special
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    href="/blogs/the-ultimate-guide-to-a-himachal-trip"
                    className="hover:underline flex items-center whitespace-nowrap"
                  >
                    <FaChevronRight className="mr-2 w-2" /> Blogs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="my-2">
                  <Link
                    href="/#treks"
                    className="hover:underline flex items-center"
                  >
                    <FaChevronRight className="mr-2 w-2" /> Treks
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    href="/#weekend-trips"
                    className="hover:underline flex items-center"
                  >
                    <FaChevronRight className="mr-2 w-2 whitespace-nowrap" />{' '}
                    Weekend Trips
                  </Link>
                </li>

                <li className="my-2">
                  <Link
                    href="/christmas-special/himachal-high"
                    className="hover:underline flex items-center"
                  >
                    <FaChevronRight className="mr-2 w-2 whitespace-nowrap" />{' '}
                    Himachal High
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    href="/#backpacking"
                    className="hover:underline flex items-center"
                  >
                    <FaChevronRight className="mr-2 w-2 whitespace-nowrap" />{' '}
                    Backpacking Trips
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="ml-auto">
            <p className="text-sm mb-2 text-right text-white">
              Accepted Payments
            </p>
            <div className="flex flex-row gap-4">
              <Image
                src="/images/payments.webp"
                width={1000}
                height={1000}
                alt="payments"
                className="max-w-[300px] h-auto bg-white rounded-fulls"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 my-4 z-50" />
      {/* Social Media Links Section */}

      {/* Copyright Section */}
      <div className="text-center mt-4 text-white z-50 bg-yellow-600">
        <p>&copy; 2024 travelchapes.com | All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
