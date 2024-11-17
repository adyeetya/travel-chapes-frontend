'use client'
import React, { useState, use } from 'react'
import Image from 'next/image'
import { destinations } from '@/data/destinations/destinations'
import { CiCircleChevDown } from 'react-icons/ci'

const DescriptionWithReadMore = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  // The full description text with <br /> for line breaks
  const fullDescription = `
    Heard about a haven full of snow-fall capped mountains, lush valleys,
    and a vibrant culture. Yes, that's Himachal Pradesh. Experience the
    serene beauty and exciting outdoor adventures in this "God’s own land".
    This 11 day Christmas & New Year Edition tour promises to be a once-in-a
    lifetime experience as we take you through the best of the thrills and
    spills of Himachal Pradesh -the safest destination for travellers in the
    country. <br />
    Head towards Bir Billing, one of the world's best paragliding
    destinations. From there, you will visit McLeod Ganj, Tibet markets and
    beautiful Bhagsu Waterfall. <br />
    After enjoying these activities you can visit the world-famous stadium
    of Dharamsala to a Scintillating mountain village, Jibhi that stands on
    watery waterfalls and freshwater lakes fascinates treks up to Jalori
    Pass and Serolsar Lake that give you panoramic views of the Himalayas. <br />
    Magic Valley, placed by the Parvati River in Kasol, helps you enjoy
    solitude plus this experience includes thrilling 4x4 adventures, hiking
    to Waichin Top, and river rafting in Manali. <br />
    After all these things, it is now time to end this exciting journey as
    you witness the natural beauty and richness of Himachal's culture by
    visiting Solang Valley, admiring the charm of Vashisht Temple, and the
    Jogini waterfall before ending your journey at Delhi. <br />
    So come and join the special backpacking tour of Himachal, aimed at
    getting familiar with iconic sights as well as some offbeat path
    experiences. This trip will ensure that, as a culture enthusiast or an
    adventure-seeking individual, you have the best mix of thrill,
    relaxation, and exploration. Book your Holiday Special Himachal High
    today and celebrate the season in one of India's most beautiful regions!
  `

  // Split the description by <br /> to keep each part as a separate paragraph
  const descriptionParts = fullDescription.split('<br />')

  // Join all the parts back together and truncate the entire string to 200 characters
  const truncatedDescription = descriptionParts.join(' ').slice(0, 200)

  // Display the truncated description with line breaks preserved
  const displayText = isExpanded ? fullDescription : truncatedDescription

  return (
    <div>
      <p
        className="text-black"
        dangerouslySetInnerHTML={{ __html: displayText }}
      />
      {fullDescription.length > 200 && (
        <span
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-700 mt-2 cursor-pointer whitespace-nowrap"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </span>
      )}
    </div>
  )
}

const TravelPackage = () => {
  return (
    <div className="container mx-auto ">
      {/* Title */}
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-black">
          Holiday Special Himachal High
        </h2>

        {/* If description exists, render the DescriptionWithReadMore component */}

        <DescriptionWithReadMore />

        {/* If detailDescription exists, render it as a list of titles and descriptions */}
      </div>
      {/* Left Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Image Gallery */}
          <div className="flex space-x-4 mb-6">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="w-24 h-36 md:w-32 md:h-48 rounded-full overflow-hidden"
              >
                <Image
                  src="https://via.placeholder.com/200x300"
                  alt={`Image ${index + 1}`}
                  width={200}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Details Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-center">
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Pickup & Drop</p>
              <p className="text-blue-600">Dehradun & Dehradun</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Category</p>
              <p className="text-blue-600">Treks</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Duration</p>
              <p className="text-blue-600">5 Days</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Altitude</p>
              <p className="text-blue-600">12500 Ft.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Difficulty</p>
              <p className="text-blue-600">Easy to Moderate</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Trek Length</p>
              <p className="text-blue-600">20 Km.</p>
            </div>
          </div>

          {/* Inclusions */}
          <p className="my-4 ">Inclusions</p>
          <div className="flex space-x-4 mb-6">
            <div className="bg-gray-700 p-2 rounded-md text-center">
              <p>Meals</p>
            </div>
            <div className="bg-gray-700 p-2 rounded-md text-center">
              <p>Stays</p>
            </div>
            <div className="bg-gray-700 p-2 rounded-md text-center">
              <p>Transfers</p>
            </div>
          </div>

          {/* Icons */}
          <div className="flex justify-around text-center space-x-4 text-black">
            <div className="flex flex-col gap-2 items-center">
              <div className="bg-blue-100 p-2 w-16 h-16 flex justify-center items-center rounded-full">
                <p className="text-3xl">🌍</p>
              </div>
              <p className="text-sm">
                Safe <br /> Travel
              </p>
            </div>
            <div className="flex flex-col gap-2  items-center">
              <div className="bg-blue-100 p-2 w-16 h-16 flex justify-center items-center rounded-full">
                <p className="text-3xl">💳</p>
              </div>
              <p className="text-sm">
                Flexible <br /> Cancellation
              </p>
            </div>
            <div className="flex flex-col gap-2  items-center">
              <div className="bg-blue-100 p-2 w-16 h-16 flex justify-center items-center rounded-full">
                <p className="text-3xl">💸</p>
              </div>
              <p className="text-sm">
                Easy <br /> EMI
              </p>
            </div>
            <div className="flex flex-col gap-2  items-center">
              <div className="bg-blue-100 p-2 w-16 h-16 flex justify-center items-center rounded-full">
                <p className="text-3xl">📞</p>
              </div>
              <p className="text-sm">
                24/7 <br />
                Support
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          {/* Price and Discount */}
          <div className="mb-6">
            <p className="text-lg font-semibold">Starts From</p>
            <div className="flex items-center space-x-2">
              <span className="text-red-500 line-through text-sm">₹9,000</span>
              <span className="bg-green-100 text-green-500 text-xs px-2 py-1 rounded-md">
                20% Off
              </span>
            </div>
            <p className="text-4xl font-bold text-blue-600 mt-2">₹7,200</p>
            <p className="text-sm text-gray-500">Per Person</p>
          </div>

          {/* Book Now Button */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold mb-6">
            Book Now
          </button>

          {/* Availability Table */}
          <div className="bg-gray-100 h-52 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-blue-600 text-white sticky top-0 gap-2">
              <div className="p-2 rounded-tl-lg">Batches</div>
              <div className="p-2">All</div>
              <div className="p-2 rounded-tr-lg">Nov</div>
            </div>

            {/* Scrollable content */}
            <div className="h-40 overflow-y-auto">
              {[
                { date: '24 Oct to 30 Oct', status: 'Filling Fast', nov: '-' },
                {
                  date: '01 Nov to 04 Nov',
                  status: 'Filling Fast',
                  nov: 'Sold Out',
                },
                {
                  date: '04 Oct to 10 Nov',
                  status: 'Sold Out',
                  nov: 'Sold Out',
                },
                {
                  date: '04 Oct to 10 Nov',
                  status: 'Sold Out',
                  nov: 'Available',
                },
                {
                  date: '04 Oct to 10 Nov',
                  status: 'Available',
                  nov: 'Available',
                },
              ].map((batch, index) => (
                <div key={index} className="grid grid-cols-3 border-b gap-2">
                  <div className="p-2 text-black">{batch.date}</div>
                  <div
                    className={`p-2 ${
                      batch.status === 'Sold Out'
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {batch.status}
                  </div>
                  <div
                    className={`p-2 ${
                      batch.nov === 'Sold Out'
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {batch.nov}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Itinerary = () => {
  const [expandedDay, setExpandedDay] = useState(null)

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day)
  }

  const briefItinerary = [
    {
      day: 'Day 1',
      description:
        'Depart from Delhi to McLeod Ganj for an overnight Volvo bus journey.',
    },
    {
      day: 'Day 2',
      description: 'Exploring McLeod Ganj: Bhagsu Waterfall & Tibetan Market.',
    },
    {
      day: 'Day 3',
      description:
        'Explore Dharamshala Stadium, McLeodGanj to Bir | Christmas Celebration in Himachal.',
    },
    {
      day: 'Day 4',
      description:
        'Paragliding in Bir & Scenic Transfer to Jibhi | Adventure in Himachal.',
    },
    { day: 'Day 5', description: 'Jalori Pass Trek & Serolsar Lake Hike.' },
    {
      day: 'Day 6',
      description: 'Jibhi Waterfall, Kasol to Chalal Riverside Hike.',
    },
    {
      day: 'Day 7',
      description:
        'Kasol to Magic Valley (Waichin) | 4X4 Adventure & Trek to Waichin Top.',
    },
    {
      day: 'Day 8',
      description:
        'Waichin to Manali, River Rafting Adventure & Mall Road Experience.',
    },
    {
      day: 'Day 9',
      description:
        'Solang Valley Adventure | Paragliding, Skiing & More in Himachal.',
    },
    {
      day: 'Day 10',
      description:
        'Manali Local Sightseeing, Vashisht Temple & Jogni Waterfall Trek.',
    },
    {
      day: 'Day 11',
      description:
        'Delhi Arrival & End of Himachal Adventure Tour | Best of Himachal.',
    },
  ]

  const fullItinerary = [
    {
      title: 'Delhi to McLeod Ganj',
      description: `Delhi to McLeod Ganj: Overnight Volvo Journey to Himachal's Serene Hill Town<br />
    Depart from Delhi to McLeod Ganj: Start your scenic overnight Volvo journey to McLeod Ganj, a peaceful hill station nestled in Himachal Pradesh.<br />
    Overnight Travel: Enjoy a comfortable overnight Volvo bus ride as you head towards the tranquil town of McLeod Ganj, known for its Tibetan culture and stunning landscapes.`,
    },
    {
      title: 'Arrival in McLeod Ganj',
      description: `Arrival in McLeod Ganj: Bhagsu Waterfall & Tibetan Market Exploration<br />
    Check-in to Hotel: Arrive in McLeod Ganj and check in to your hotel for a comfortable stay.<br />
    Explore Bhagsu Waterfall: Visit the picturesque Bhagsu Waterfall, a popular spot for a refreshing dip and relaxation amidst nature.<br />
    Tibetan Market Exploration: Wander through the vibrant Tibetan market, a must-visit for souvenir shopping and experiencing the local Tibetan culture.<br />
    Dinner & Overnight Stay: End your day with a delicious dinner and overnight stay at your accommodation in McLeod Ganj.`,
    },
    {
      title: 'Dharamshala & Bir',
      description: `Dharamshala Stadium, McLeod Ganj to Bir & Christmas Celebration<br />
    Visit Dharamshala Cricket Stadium: Start the day with a visit to the iconic Dharamshala Cricket Stadium, nestled in the breathtaking Himalayas, known for its scenic backdrop.<br />
    Travel to Bir: Continue your journey to Bir, Asia's highest paragliding destination, famous for its adventure activities and serene landscapes.<br />
    Christmas Celebration in Bir: Check-in at your accommodation in Bir and join a festive Christmas celebration surrounded by the beauty of the Himalayan village.<br />
    Explore Local Attractions: Visit Gunehar Waterfall, Sherab Ling Monastery, and indulge in cafe hopping—a popular activity in Bir.<br />
    Dinner & Overnight Stay: End your day with a delicious dinner and a relaxing night at your Bir accommodation.`,
    },
    {
      title: 'Paragliding & Jibhi',
      description: `Paragliding in Bir & Transfer to Jibhi | Adventure & Nature in Himachal<br />
    Paragliding in Bir: Kick off the day with an exhilarating paragliding adventure in Bir, known as Asia's highest paragliding destination, offering stunning aerial views of the Himalayan landscapes.<br />
    Journey to Jibhi: After the adrenaline rush, continue your journey to Jibhi, a serene and picturesque village tucked away in the heart of Himachal Pradesh, perfect for nature lovers.<br />
    Explore Jibhi Waterfall: Upon arrival, check in to your Jibhi accommodation and head to the tranquil Jibhi Waterfall, a hidden gem for peaceful exploration.<br />
    Dinner & Overnight Stay: End the day with a delicious dinner and unwind for a peaceful night in the beautiful village of Jibhi.`,
    },
    {
      title: 'Jalori Pass & Serolsar Lake',
      description: `Trek to Jalori Pass & Serolsar Lake | Himalayan Adventure in Jibhi<br />
    Trek to Jalori Pass: Begin your day with an exciting trek to Jalori Pass, where you’ll be rewarded with panoramic views of the majestic Himalayas.<br />
    Explore Serolsar Lake: Continue your trek to the serene Serolsar Lake, a pristine alpine lake surrounded by lush forests, perfect for nature photography and peaceful moments.<br />
    Return to Jibhi: After a day of adventure, head back to Jibhi and relax with an overnight stay in this tranquil village.`,
    },
    {
      title: 'Jibhi to Kasol',
      description: `Jibhi Waterfall, Jibhi to Kasol & Chalal Riverside Hike | Nature & Culture in Himachal<br />
    Visit Jibhi Waterfall: Start the day with a visit to the Jibhi Waterfall, a beautiful natural wonder perfect for photos and relaxation in the serene surroundings.<br />
    Travel from Jibhi to Kasol: Continue your journey to Kasol, the vibrant backpacker’s haven in Parvati Valley. On the way, stop at the famous Manikaran Sahib Gurudwara and enjoy a rejuvenating dip in the natural hot springs.<br />
    Chalal Riverside Hike: Embark on a scenic riverside hike to Chalal, a quiet village where you can immerse yourself in nature and enjoy the tranquillity of the Parvati River.<br />
    Check-in to Kasol: Arrive in Kasol and check in to your comfortable accommodation, ready for another adventurous day ahead.`,
    },
    {
      title: 'Magic Valley Adventure',
      description: `Kasol to Magic Valley (Waichin) | 4X4 Adventure & Trek to Waichin Top<br />
    Journey to Magic Valley (Waichin): Begin your day with a trip to Magic Valley (Waichin), a mystical destination known for its captivating landscapes and serene beauty.<br />
    4X4 Adventure Ride: Experience the thrill of a 4X4 adventure ride as you traverse rugged terrain to reach this magical valley, a hidden gem in Himachal Pradesh.<br />
    Trek to Waichin Top: Embark on an exciting trek to Waichin Top, where you’ll be rewarded with stunning panoramic views of the surrounding mountains and valleys.<br />
    Overnight in Waichin: After a day of adventure, enjoy an overnight stay in the tranquil Magic Valley to unwind and soak in the peaceful atmosphere.`,
    },
    {
      title: 'Rafting & Mall Road',
      description: `Waichin to Manali | River Rafting Adventure & Mall Road Exploration<br />
    Trek from Waichin to Manali: Start your journey with a scenic trek down from Waichin to Manali, one of Himachal Pradesh's most popular hill stations, surrounded by breathtaking landscapes.<br />
    River Rafting in Manali: Experience the thrill of river rafting in Manali, where you’ll navigate the powerful currents of the Beas River, offering an adrenaline-pumping adventure.<br />
    Explore Mall Road: Stroll along Manali’s Mall Road, famous for its vibrant shops selling local handicrafts, souvenirs, and unique items, perfect for a cultural experience and shopping spree.<br />
    Check-in to Manali Accommodations: After a day filled with adventure and exploration, check in to your comfortable accommodation in Manali and relax for the night.`,
    },
    {
      title: 'Solang Valley Adventure',
      description: `Solang Valley Adventure | Paragliding, Zorbing & Atal Tunnel Exploration<br />
    Solang Valley Adventure Activities: Head to Solang Valley, a hub for thrilling adventure activities set against the stunning backdrop of the Himalayas.<br />
    Paragliding & Zorbing: Experience an adrenaline rush with paragliding and zorbing in Solang Valley, offering incredible views and exciting moments in nature.<br />
    Visit Atal Tunnel: Explore the engineering marvel of the Atal Tunnel, one of the longest highway tunnels in the world, connecting Manali to Lahaul-Spiti.<br />
    Return to Manali & New Year Celebration: Head back to Manali for a fun-filled New Year celebration, marking the end of an unforgettable adventure.`,
    },
    {
      title: 'Manali Local Sightseeing',
      description: `Manali Local Sightseeing | Vashisht Temple, Hadimba Temple & Jogni Waterfall<br />
    Explore Manali's Local Attractions: Begin your day with a visit to Vashisht Temple and the iconic Hadimba Devi Temple, both offering a glimpse into the region’s rich culture and spiritual heritage.<br />
    Visit Jogni Waterfall: Continue your journey to the serene Jogni Waterfall, a peaceful spot for nature lovers, where you can enjoy a quiet moment surrounded by lush greenery.<br />
    Overnight Volvo Bus to Delhi: After a day of sightseeing, board your comfortable overnight Volvo bus for a smooth journey back to Delhi, bringing your Himachal adventure to a close.`,
    },
    {
      title: 'Delhi Arrival',
      description: `Delhi Arrival | End of Himachal Adventure Tour<br />
    Arrival in Delhi: Arrive in Delhi early in the morning (around 9 AM, tentative), marking the end of your unforgettable Himachal adventure tour.<br />
    Farewell to Fellow Travellers: Bid farewell to your travel companions, leaving you with lasting memories of scenic landscapes, adventure, and cultural exploration of manali and himachal pradesh.<br />
    Note: Please consult your Trip Coordinator before scheduling your return flight from Delhi on this day. Safe travels!`,
    },
  ]

  return (
    <div className="bg-gray-50 p-2 md:p-6 w-full max-w-screen-xl mx-auto rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Brief Itinerary
      </h2>
      <div className="space-y-4">
        {briefItinerary.map((item, index) => (
          <div
            key={index}
            className="p-1 md:p-3 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gray-100 text-gray-700 font-semibold rounded-md px-2 md:px-4 py-2 mr-1 md:mr-4 text-sm md:text-md whitespace-nowrap">
                  {item.day}
                </div>
                <div className="text-gray-800 text-sm md:text-md">
                  {item.description}
                </div>
              </div>
              <button
                onClick={() => toggleDay(item.day)}
                className="text-blue-500 font-medium text-sm md:text-md flex items-center justify-end min-w-12"
              >
                <span className="hidden md:block">
                  {expandedDay === item.day ? 'Show Less' : 'Show More'}
                </span>
                <CiCircleChevDown
                  className={`ml-1 transform transition-transform ${
                    expandedDay === item.day ? 'rotate-180' : 'rotate-0'
                  } w-8 h-8`}
                />
              </button>
            </div>

            <div
              className={`transition-all duration-1000 ease-in-out overflow-hidden ${
                expandedDay === item.day
                  ? 'max-h-[1000px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {expandedDay === item.day && (
                <div className="mt-3 p-1 md:p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  <h3 className="font-semibold text-gray-800 ">
                    {fullItinerary[index].title}
                  </h3>
                  <p
                    className="whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: fullItinerary[index].description.replace(
                        /\n/g,
                        '<br />'
                      ),
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-600 mt-6">
        <strong>Note:</strong> Please consult your Trip Coordinator before
        scheduling your return flight from Delhi on Day 11. Safe travels!
      </p>
    </div>
  )
}

const ImagesGrid = () => {
  const images = [
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh1.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh2.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh3.webm',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh4.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh5.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh6.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh7.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh8.webp',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh9.webp',

    // Add more images with varying dimensions as needed
  ]

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {images.map((media, index) => {
        const isVideo = /\.(mp4|webm)$/i.test(media) // Check if the media is a video
        return (
          <div key={index} className="mb-4 overflow-hidden rounded-lg">
            {isVideo ? (
              <video
                src={media}
                className="object-cover w-full h-full"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <Image
                src={media}
                width={1000}
                height={1000}
                alt={`Media item ${index + 1}`}
                className="object-cover w-full h-full"
                quality={80}
                priority
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
const ImagesSlider = () => {
  const images = [
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh1.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh2.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh3.webm',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh4.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh5.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh6.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh7.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh8.webp',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Himachal_exclusive/hh9.webp',

    // Add more images with varying dimensions as needed
  ]

  return (
    <div className="p-4">
      <div className="overflow-x-scroll whitespace-nowrap scroll-smooth flex gap-4">
        {images.map((media, index) => {
          const isVideo = /\.(mp4|webm)$/i.test(media) // Check if the media is a video
          return (
            <div
              key={index}
              className="inline-block mb-4 w-full max-w-[300px] flex-shrink-0 min-h-[400px]"
            >
              {isVideo ? (
                <video
                  src={media}
                  className="object-cover w-full h-auto rounded-lg min-h-[400px]"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <Image
                  src={media}
                  width={1000}
                  height={1000}
                  alt={`Media item ${index + 1}`}
                  className="object-cover w-full h-auto rounded-lg min-h-[400px]"
                  quality={80}
                  priority
                />
              )}
            </div>
          )
        })} 
      </div>
    </div>
  )
}

const InclusionsExclusions = () => {
  const inclusions = [
    {
      title: 'Transportation',
      description:
        'Volvo Travel: Enjoy a comfortable Volvo bus ride for your Delhi to McLeod Ganj journey, as well as your return from Manali to Delhi.<br />' +
        'Tempo Traveler: Travel in a spacious and convenient Tempo Traveler for seamless sightseeing and exploration throughout the trip.',
    },
    {
      title: 'Accommodation',
      description:
        '8 Nights Accommodation: Stay in cozy hotels across Himachal Pradesh, including:<br />' +
        '1 night in McLeod Ganj<br />' +
        '1 night in Bir<br />' +
        '2 nights in Jibhi<br />' +
        '1 night in Kasol<br />' +
        '1 night in Waichin<br />' +
        '2 nights in Manali',
    },
    {
      title: 'Meal Plan (MAP)',
      description:
        'Savor 16 delicious meals during your trip with a balanced mix of breakfast and dinner:<br />' +
        'Day 2: 1 Dinner<br />' +
        'Day 3: 1 Breakfast + 1 Dinner<br />' +
        'Day 4: 1 Breakfast + 1 Dinner<br />' +
        'Day 5: 1 Breakfast + 1 Dinner<br />' +
        'Day 6: 1 Breakfast + 1 Dinner<br />' +
        'Day 7: 1 Breakfast + 1 Dinner<br />' +
        'Day 8: 1 Breakfast + 1 Dinner<br />' +
        'Day 9: 1 Breakfast + 1 Dinner<br />' +
        'Day 10: 1 Breakfast',
    },
    {
      title: 'Exciting Activities',
      description:
        'Engage in thrilling activities such as:<br />' +
        'Paragliding in Bir<br />' +
        'River rafting in Kullu<br />' +
        '4x4 adventure ride to Waichin<br />' +
        'Trekking to Serolsar Lake and Waichin Top<br />' +
        'Music & Bonfires on Christmas and New Year’s Eve<br />' +
        'Participate in ice-breaking sessions and group activities<br />' +
        'Enjoy daily live music to set the mood for adventure.',
    },
    {
      title: 'New Year Celebrations',
      description:
        'Celebrate in style with complimentary 2+2 Veg & Non-Veg snacks for the New Year celebration.<br />' +
        'Mark the festive season with a complimentary cake for both Christmas and New Year’s celebrations.',
    },
    {
      title: 'Tour Support',
      description:
        'Dedicated Trip Captain: Travel with confidence as a professional Trip Captain accompanies you throughout the tour.<br />' +
        'Trek Guide: Benefit from the expertise of a Trek Guide for your Jalori Pass trek and other excursions.',
    },
    {
      title: 'Logistics and Permits',
      description:
        'All necessary permits for the trip are included, ensuring a hassle-free experience.<br />' +
        'First Aid Kits are provided for your safety and peace of mind.<br />' +
        'Driver allowance, toll taxes, parking charges, and state taxes are also covered.',
    },
  ]

  const exclusions = [
    {
      title: '5% GST',
      description:
        'Applicable Goods and Services Tax (GST) is not included in the package price.',
    },
    {
      title: 'Early Check-in Charges',
      description:
        'Any charges for early check-in at the hotel will be borne by the traveler.',
    },
    {
      title: 'Personal Expenses',
      description:
        'Any personal expenses such as shopping, souvenirs, or additional services not part of the package are not included.',
    },
    {
      title: 'Additional Accommodation/Food Costs',
      description:
        'Any extra accommodation or food costs incurred due to delayed travel or changes in schedule will be at the traveler’s expense.',
    },
    {
      title: 'Meals Not Included',
      description:
        'Lunch and any meals not specifically mentioned in the package inclusions are not part of the package.',
    },
    {
      title: 'Other Exclusions',
      description:
        'Any other services or items not explicitly mentioned in the Package Inclusions are excluded from the tour package.',
    },
  ]

  return (
    <div className="bg-green-100 w-full max-w-screen-xl mx-auto p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inclusions Column */}
        <div>
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Inclusions
          </h2>
          <ul className="space-y-3">
            {inclusions.map((item, index) => (
              <div
                key={index}
                className="mb-4 text-green-800 flex justify-start items-start"
              >
                <span className="h-3 w-3 bg-green-800 rounded-full mt-[6px] mr-3 flex-shrink-0"></span>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}:</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                </div>
              </div>
            ))}
          </ul>
        </div>

        {/* Exclusions Column */}
        <div>
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Exclusions
          </h2>
          <ul className="space-y-3">
            {exclusions.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="h-3 w-3 bg-green-800 rounded-full mt-[6px] mr-3 flex-shrink-0"></span>
                <div className="text-gray-700">
                  <h3 className="text-gray-800 font-semibold">{item.title}:</h3>{' '}
                  {item.description}
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const ImportantPoints = () => {
  return (
    <div className="bg-gray-100 w-full max-w-screen-xl mx-auto p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Important Points
      </h2>
      <div className="space-y-6">
        {points.map((point, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {point.title}
            </h3>
            <p className="text-gray-700">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const Testimonials = () => {
  const reviews = [
    {
      name: 'Priyanka Kashyap',
      date: 'Dec 25, 2024',
      rating: 5,
      review:
        'I took the Christmas package of Chopta-Tungnath trek through WanderOn. And I really feel grateful that I chose the right travelling community. Our entire trip was very smooth. Our captains - our Heroes Aaliya and Nitin executed everything very efficiently.',
      avatar: '/path/to/avatar1.jpg',
    },
    {
      name: 'Prachi Singhal',
      date: 'Dec 25, 2024',
      rating: 5,
      review:
        'We went on a trekking trip to Tungnath and Deoriatal with WanderOn, and it was just amazing. It was my 2nd experience with these guys, and this time again, their planning and arrangements were perfect.',
      avatar: '/path/to/avatar2.jpg',
    },
  ]

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6 space-y-8">
      {/* Testimonials Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-semibold">Testimonials</h2>
        <p className="text-gray-500">The word on the street</p>
      </div>

      {/* Rating Icons */}
      <div className="flex justify-center space-x-6">
        {[
          { icon: '/path/to/google-icon.png', rating: 4.9, reviews: 12300 },
          {
            icon: '/path/to/tripadvisor-icon.png',
            rating: 5.0,
            reviews: 12300,
          },
          { icon: '/path/to/facebook-icon.png', rating: 4.9, reviews: 12300 },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <Image src={item.icon} width={40} height={40} alt="Rating Icon" />
            <p className="font-semibold">{item.rating}</p>
            <p className="text-gray-500">({item.reviews} reviews)</p>
          </div>
        ))}
      </div>

      {/* Review Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="relative flex flex-col bg-white p-6 rounded-lg shadow-lg border border-gray-100 transition-transform hover:scale-105 duration-300"
          >
            <div className="flex items-center mb-4">
              <Image
                src={review.avatar}
                width={50}
                height={50}
                alt="Avatar"
                className="w-14 h-14 rounded-full border-2 border-gray-200"
              />
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">{review.name}</h4>
                <div className="flex items-center space-x-1 text-yellow-500">
                  {Array(review.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                </div>
              </div>
            </div>

            <p className="text-gray-600 italic mb-6">{review.review}</p>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-gray-400 text-sm">{review.date}</p>
              <a href="#" className="text-blue-600 font-semibold text-sm">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Page = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center  text-white relative">
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-3rem)] bg-gray-500">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/images/himachal-high/himachal_limited.webm"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        {/* Top left glass effect text */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-black bg-opacity-20 text-white px-2 py-1 md:px-4 md:py-2 rounded-md backdrop-blur-lg">
          <p className="text-xs md:text-sm font-light">
            &quot;Adventures and memories&quot;
          </p>
        </div>

        {/* Top right overlayed image */}
        <div className="absolute top-16 right-4 md:top-16 md:right-16 h-1/3 w-1/2 md:h-1/2 md:w-1/3 bg-cover rounded-lg overflow-hidden">
          <Image
            src="https://via.placeholder.com/400x400"
            alt="Place"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Overlapping circular images */}
        <div className="absolute bottom-12 right-4 md:bottom-12 md:right-16 flex -space-x-2">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-400 rounded-full overflow-hidden">
            <Image
              src="https://via.placeholder.com/200x200"
              alt="Circle 1"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full overflow-hidden">
            <Image
              src="https://via.placeholder.com/200x200"
              alt="Circle 2"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full overflow-hidden">
            <Image
              src="https://via.placeholder.com/200x200"
              alt="Circle 3"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Place name at the bottom left */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Holiday Special - Himachal High
          </h1>
          <p className="text-xl mt-4">Exclusive Christmas & New Year Edition</p>
        </div>
      </section>
      <section className="my-12 w-full">
        <TravelPackage />
      </section>
      <section className="my-12 w-full">
        <Itinerary />
      </section>
      <section className="my-12 w-full hidden md:block">
        <ImagesGrid />
      </section>
      <section className="my-12 w-full md:hidden">
        <ImagesSlider />
      </section>
      <section className="my-12 w-full">
        <InclusionsExclusions />
      </section>
      {/* <section className="my-12 w-full">
        <ImportantPoints  />
      </section> */}
      <section className="my-12 w-full">
        <Testimonials />
      </section>
    </div>
  )
}

export default Page
