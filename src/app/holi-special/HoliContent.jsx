import React from 'react'
import {motion} from 'framer-motion'
const HoliContent = () => {
  return (
 <div>
    <div className="min-h-screen">
    {/* Banner Section */}
    <motion.div
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <motion.div
        className="text-center text-white relative z-10 p-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl md:text-8xl font-extrabold text-yellow-300 drop-shadow-lg">Celebrate Holi with Us!</h1>
        <p className="text-2xl md:text-4xl mt-6 text-pink-300 drop-shadow-lg">Join us for an unforgettable Holi getaway with colors, music, and adventure! 🎨✨</p>
        <motion.button
          className="mt-8 px-8 py-4 bg-white text-pink-600 font-bold text-xl rounded-full shadow-2xl hover:bg-pink-500 hover:text-white transition"
          whileHover={{ scale: 1.1 }}
        >
          Book Now
        </motion.button>
      </motion.div>
    </motion.div>

    {/* Space for Carousel */}
    <div className="py-32 bg-white text-center">
      <h2 className="text-5xl font-extrabold text-yellow-500">Explore Our Holi Trips</h2>
      <p className="text-xl text-gray-700">Colorful destinations filled with vibrant festivities and adventure!</p>
      <div className="mt-16"> {/* Placeholder for Carousel */} </div>
    </div>

    {/* Holi Offers Section */}
    <div className="py-20 bg-gradient-to-r from-yellow-400 to-pink-500 text-center text-white">
      <h2 className="text-5xl font-extrabold drop-shadow-lg">Special Holi Offers 🎁</h2>
      <div className="mt-10 flex flex-wrap justify-center gap-10">
        <motion.div
          className="p-8 bg-white text-pink-600 rounded-3xl shadow-2xl w-96 text-center"
          whileHover={{ scale: 1.1 }}
        >
          <h3 className="text-3xl font-bold">Flat 20% Off</h3>
          <p className="text-xl text-gray-700">On all Holi trips booked before March 10th</p>
        </motion.div>

        <motion.div
          className="p-8 bg-white text-yellow-600 rounded-3xl shadow-2xl w-96 text-center"
          whileHover={{ scale: 1.1 }}
        >
          <h3 className="text-3xl font-bold">Buy 2 Get 1 Free</h3>
          <p className="text-xl text-gray-700">Bring your friends and enjoy more!</p>
        </motion.div>
      </div>
    </div>

    {/* About Holi Section */}
    <div className="relative py-40 bg-white text-center text-black overflow-hidden">
      <motion.div
        className="absolute inset-0 flex justify-around opacity-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      >
        <div className="w-60 h-60 bg-pink-500 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="w-80 h-80 bg-yellow-400 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="w-60 h-60 bg-blue-500 rounded-full blur-3xl mix-blend-screen"></div>
      </motion.div>
      <h2 className="text-6xl font-extrabold text-pink-600 drop-shadow-lg">Holi: The Ultimate Travel Experience</h2>
      <p className="text-2xl mt-6 max-w-5xl mx-auto relative z-10">Holi isn&apos;t just about colors; it&apos;s about unforgettable journeys! Join us for an exciting travel experience filled with scenic beauty, thrilling adventure, and cultural festivities. Dance to the beats of traditional Holi music, explore vibrant streets covered in color, and immerse yourself in the festive chaos.</p>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/bright-squares.png')] opacity-20"></div>
      </div>
      <motion.div
        className="mt-16 flex justify-center gap-2 md:gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="md:w-24 md:h-24 w-12 h-12 bg-pink-500 rounded-full shadow-2xl"
          
        ></motion.div>
        <motion.div
          className="md:w-24 md:h-24 w-12 h-12 bg-yellow-400 rounded-full shadow-2xl"
          
        ></motion.div>
        <motion.div
          className="md:w-24 md:h-24 w-12 h-12 bg-blue-500 rounded-full shadow-2xl"
          
        ></motion.div>
        <motion.div
          className="md:w-24 md:h-24 w-12 h-12 bg-red-500 rounded-full shadow-2xl"
         
        ></motion.div>
        <motion.div
          className="md:w-24 md:h-24 w-12 h-12 bg-purple-500 rounded-full shadow-2xl"
          
        ></motion.div>
      </motion.div>
    </div>

    {/* Sangla Holi Trip Section */}
    <div className="py-20 bg-gradient-to-r from-purple-400 to-orange-500 text-center text-white">
      <h2 className="text-5xl font-extrabold drop-shadow-lg">Sangla Holi Trip 🌄</h2>
      <p className="text-xl mt-4 max-w-4xl mx-auto">Celebrate Holi in the stunning valley of Sangla! Surrounded by snow-capped peaks and breathtaking landscapes, this exclusive getaway offers bonfire nights, vibrant Holi celebrations, and adventure-packed days in nature.</p>
    </div>
  </div>
 </div>
  )
}

export default HoliContent