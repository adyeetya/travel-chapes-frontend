import Link from 'next/link'
import Image from 'next/image'

const About = () => {
  return (
    <div className="relative my-12 flex items-center justify-center min-h-screen px-4">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/videos/about-us.webm" type="video/webm" />
      </video>

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-6xl px-6 md:px-12">
        {/* Left Side - Heading */}
        <h1 className="text-white text-4xl md:text-6xl font-bold flex-1 mb-8 md:mb-0">
          From Screen <br /> To Reality
        </h1>

        {/* Right Side - Glassmorphic Card */}
        <div className="flex-1 p-6 md:p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 max-w-md">
          <p className="text-white text-lg">
          Turn your travel dreams into memorable reality with TravelChapes.
              Our Expert team curates personalised adventures, from stunning
              treks to peaceful getaways, connecting you to the world’s beauty.
              Join us for journeys filled with exploration, happiness, and
              Cherished moments —Let’s bring your travel dreams to life!
          </p>
          <Link href="/our-team">
            <button className="mt-4 px-6 py-3 bg-yellow-600/50 text-white font-semibold rounded-full hover:bg-yellow-700/60 transition">
              Our Team
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
