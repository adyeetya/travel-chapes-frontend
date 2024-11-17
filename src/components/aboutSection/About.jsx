import Link from 'next/link'
import Image from 'next/image'
const About = () => {
  return (
    <div className="bg-[#] py-4 relative">
      {/* Background image with noise */}
      <div className="absolute inset-0 bg-yellow-500 opacity-40 bg-cover bg-center z-0"></div>

      {/* Content Section */}
      <div className="p-4 my-12 md:py-6 max-w-screen-xl mx-auto relative z-10">
        {/* Top Heading */}
        <div className="text-right flex flex-col gap-4 w-full justify-center">
          {/* Replace with your SVG image */}
          <h1 className="text-[8vw] md:text-[6vw]">
            FROM REEL <br /> TO REALITY
          </h1>
        </div>
        <div className="absolute inset-0 top-20 -left-8 md:left-20 -z-10">
          <div className="rounded-full w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] md:w-96 md:h-96 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/homepage/aboutus.gif"
              alt="About Us Image"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-full"
            />
            {/* <video
              src="/images/aboutus.gif"
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full rounded-full"
            ></video> */}
          </div>
        </div>

        {/* Image and Text Container */}
        <div className="mt-40 md:mt-28 lg:mt-10 flex flex-col md:flex-row items-center md:items-end justify-end relative">
          {/* Text Content Beside Image */}
          <div className="mt-8 max-w-2xl text-justify w-full flex flex-col items-end">
            <p className="text-lg leading-relaxed">
              Turn your travel dreams into memorable reality with TravelChapes.
              Our Expert team curates personalised adventures, from stunning
              treks to peaceful getaways, connecting you to the world’s beauty.
              Join us for journeys filled with exploration, happiness, and
              Cherished moments —Let’s bring your travel dreams to life!
            </p>
            <div className="mt-10 ml-auto md:ml-0 text-">
              <Link
                href="/our-team"
                className="bg-primary text-primary-foreground rounded-full px-6 py-1 text-lg"
              >
                Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
