"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useAuthContext } from "@/app/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { fetchAllCategories } from "@/app/fetchTrip";
import React from "react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const menuRef = useRef(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isChristmasPage = pathname === "/christmas-new-year-special";
  const { user, logout } = useAuthContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await fetchAllCategories();
        setCategories(categories);
        console.log("Fetched categories:", categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    },
    [menuRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    console.log("Search query:", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleScrollChange = () => {
      setIsScrolled(window.scrollY > 0);
    };

    document.addEventListener("scroll", handleScrollChange);
    return () => {
      document.removeEventListener("scroll", handleScrollChange);
    };
  }, []);

  // Main categories to show as buttons
  const mainCategories = [
    "Backpacking",
    "Treks",
    "Weekend Trip",
    "Biking Trip",
  ];

  // Helper to slugify category names for URLs
  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");

  return (
    <nav
      className={`${
        !isScrolled && isHomePage ? "bg-[#000]" : "bg-[#000]"
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
          <div className="hidden lg:flex space-x-4 lg:space-x-6 items-center">
            {/* Main category buttons */}
            {categories
              .filter((cat) => mainCategories.includes(cat.category))
              .map((cat) => (
                <Link
                  key={cat._id}
                  href={`/${slugify(cat.category)}`}
                  className="border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out hover:bg-gray-300 hover:text-black active:scale-95"
                >
                  {cat.category === "Backpacking"
                    ? "Backpacking Trips"
                    : cat.category === "Treks"
                    ? "Treks"
                    : cat.category === "Weekend Trip"
                    ? "Weekend Trips"
                    : cat.category === "Biking Trip"
                    ? "Biking Trips"
                    : cat.category}
                </Link>
              ))}
            {/* More dropdown for other categories */}
            <div className="relative group">
              <button
                className="border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out hover:bg-gray-300 hover:text-black active:scale-95"
              >
                More
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50"
                onMouseEnter={e => e.currentTarget.classList.add('opacity-100','visible')}
                onMouseLeave={e => e.currentTarget.classList.remove('opacity-100','visible')}
              >
                {categories
                  .filter((cat) =>
                    !mainCategories.includes(cat.category) &&
                    !["custom", "customised", "customized", "Customised", "Custom", "Customised"].some((c) => cat.category.toLowerCase().includes(c))
                  )
                  .map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/${slugify(cat.category)}`}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      {cat.category}
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Social Icons Section */}
          <div className="flex space-x-4 items-center">
            <a
              href="https://wa.me/+918650500202"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-button hidden md:block"
            >
              <FaWhatsapp className="h-6 w-6 text-gray-100" />
            </a>
            <a
              href="tel:+918851629108"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-button hidden md:block"
            >
              <IoIosCall className="h-6 w-6 text-gray-100" />
            </a>
            <a
              href="mailto:contact@travelchapes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-button hidden md:block"
            >
              <IoMailOutline className="h-6 w-6 text-gray-100" />
            </a>

            {/* Conditional Sign Up / Logout Button */}
            {user ? (
              <button
                onClick={logout}
                className="border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out 
                  hover:bg-red-600 hover:text-white active:scale-95"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/signup"
                className="border border-gray-100 text-sm rounded-full px-3 py-1 transition duration-200 ease-in-out 
                  hover:bg-yellow-600 hover:text-white active:scale-95"
              >
                Sign Up
              </Link>
            )}

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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="z-50 md:hidden absolute pb-8 top-12 right-0 bg-[#080808] text-white shadow-lg w-full"
        >
          <div className="px-4 py-4 space-y-2">
            {/* Main categories */}
            {categories
              .filter((cat) => mainCategories.includes(cat.category))
              .map((cat) => (
                <Link
                  key={cat._id}
                  href={`/${slugify(cat.category)}`}
                  className="block px-4 py-3 text-lg font-semibold border-b border-gray-600"
                >
                  {cat.category === "Backpacking"
                    ? "Backpacking Trips"
                    : cat.category === "Treks"
                    ? "Treks"
                    : cat.category === "Weekend Trip"
                    ? "Weekend Trips"
                    : cat.category === "Biking Trip"
                    ? "Biking Trips"
                    : cat.category}
                </Link>
              ))}
            {/* More menu for other categories */}
            {categories.filter((cat) =>
              !mainCategories.includes(cat.category) &&
              !["custom", "customised", "customized"].some((c) => cat.category.toLowerCase().includes(c))
            ).length > 0 && (
              <details className="w-full">
                <summary className="block px-4 py-3 text-lg font-semibold border-b border-gray-600 cursor-pointer select-none focus:outline-none">
                  More
                </summary>
                <div className="bg-[#181818] rounded-b-md">
                  {categories
                    .filter((cat) =>
                      !mainCategories.includes(cat.category) &&
                      !["custom", "customised", "customized"].some((c) => cat.category.toLowerCase().includes(c))
                    )
                    .map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/${slugify(cat.category)}`}
                        className="block px-4 py-2 text-base border-b border-gray-700 hover:bg-gray-700"
                      >
                        {cat.category}
                      </Link>
                    ))}
                </div>
              </details>
            )}
            
            <div className="flex justify-evenly space-x-4 items-center">
              <a
                href="https://wa.me/+918650500202"
                target="_blank"
                rel="noopener noreferrer"
                className="menu-button"
              >
                <FaWhatsapp className="h-8 w-8 text-gray-100" />
              </a>
              <a
                href="tel:+918851629108"
                target="_blank"
                rel="noopener noreferrer"
                className="menu-button"
              >
                <IoIosCall className="h-8 w-8 text-gray-100" />
              </a>
              <a
                href="mailto:contact@travelchapes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="menu-button"
              >
                <IoMailOutline className="h-8 w-8 text-gray-100" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
