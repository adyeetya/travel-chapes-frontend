'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoClose } from 'react-icons/io5'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaWhatsapp } from 'react-icons/fa'
import { IoIosCall } from 'react-icons/io'
import { IoMailOutline } from 'react-icons/io5'

import React from 'react'

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef(null)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isChristmasPage = pathname === '/christmas-new-year-special'

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleClickOutside = useCallback((event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !event.target.closest('.menu-button')
    ) {
      setIsMenuOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    console.log('Search query:', searchQuery)
  }, [searchQuery])

  useEffect(() => {
    const handleScrollChange = () => {
      setIsScrolled(window.scrollY > 0)
    }

    document.addEventListener('scroll', handleScrollChange)
    return () => {
      document.removeEventListener('scroll', handleScrollChange)
    }
  }, [])

  return (
    <nav
      className={`${
        !isScrolled && isHomePage ? 'bg-[#000]' : 'bg-[#000]'
      } text-gray-100 sticky inset-x-0 top-0 z-30 transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex justify-center items-center">
              <Image
                src="/images/logo.png"
                alt=""
                width={1000}
                height={1000}
                className="h-14 w-auto"
                priority
              />
              <h1 className="font-bold text-lg text-yellow-500 hidden sm:block">
                TRAVEL CHAPES
              </h1>
            </Link>
          </div>

          {/* Links Section */}
          <div className="hidden lg:flex space-x-4 lg:space-x-6">
            <Link
              href="/christmas-new-year-special"
              className={`border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out 
        hover:bg-red-500 hover:text-white active:scale-95 ${
          isChristmasPage ? 'animate-glow bg-red-500' : ''
        }`}
            >
              Holi Special
            </Link>
            <Link
              href="/#backpacking"
              className="border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out 
        hover:bg-gray-300 hover:text-black active:scale-95"
            >
              Backpacking Trips
            </Link>
            <Link
              href="/#treks"
              className="border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out 
        hover:bg-gray-300 hover:text-black active:scale-95"
            >
              Treks
            </Link>
            <Link
              href="/#weekend-fun"
              className="border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out 
        hover:bg-gray-300 hover:text-black active:scale-95"
            >
              Weekend Fun
            </Link>
          </div>

          {/* Social Icons Section */}
          <div className="flex space-x-4 items-center">
            <a
              href="https://wa.me/+918650500202"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-button"
            >
              <FaWhatsapp className="h-6 w-6 text-gray-100" />
            </a>
            <a
              href="tel:+918851629108"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-button"
            >
              <IoIosCall className="h-6 w-6 text-gray-100" />
            </a>
            <a
              href="mailto:contact@travelchapes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-button"
            >
              <IoMailOutline className="h-6 w-6 text-gray-100" />
            </a>

            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="menu-button focus:outline-none lg:hidden"
            >
              {isMenuOpen ? (
                <IoClose className="h-6 w-6 text-gray-100" />
              ) : (
                <RxHamburgerMenu className="h-6 w-6 text-gray-100" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col space-y-4 mt-4 lg:hidden">
            <Link
              href="/christmas-new-year-special"
              className={`border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out 
        hover:bg-red-500 hover:text-white active:scale-95 ${
          isChristmasPage ? 'animate-glow bg-red-500' : ''
        }`}
            >
              X Max & New Year
            </Link>
            <Link
              href="/#backpacking"
              className="border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out 
        hover:bg-gray-300 hover:text-black active:scale-95"
            >
              Backpacking Trips
            </Link>
            <Link
              href="/#treks"
              className="border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out 
        hover:bg-gray-300 hover:text-black active:scale-95"
            >
              Treks
            </Link>
            <Link
              href="/#weekend-fun"
              className="border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out 
        hover:bg-gray-300 hover:text-black active:scale-95"
            >
              Weekend Fun
            </Link>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="z-50 md:hidden absolute top-12 right-0 bg-[#080808] text-white shadow-lg w-full"
        >
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/christmas-new-year-special"
              className="block px-4 py-3 text-lg font-semibold border-b border-gray-600"
            >
              X Mas & New Year
            </Link>
            <Link
              href="/#backpacking"
              className="block px-4 py-3 text-lg font-semibold border-b border-gray-600"
            >
              Backpacking Trips
            </Link>
            <Link
              href="/#treks"
              className="block px-4 py-3 text-lg font-semibold border-b border-gray-600"
            >
              Treks
            </Link>
            <Link
              href="/#weekend-fun"
              className="block px-4 py-3 text-lg font-semibold border-b border-gray-600"
            >
              Weekend Fun
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
