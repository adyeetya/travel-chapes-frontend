'use client'

import React, { useState, use, useEffect } from 'react'
import Image from 'next/image'

import { Trips } from '@/data/destinations/details'
import { CiCircleChevDown } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import { FaCaretDown } from 'react-icons/fa'
import { TripModal } from '@/components/TripModal/TripModal'

const destination = {
  id: 'spiti-high-11d',
  title: 'Spiti Valley -An Exclusive Holidays Package',
  category: ['weekend', 'backpacking', 'christmas', 'trek'],
  banners: {
    phone: '/images/spiti/spiti-banner-both.webp',
    web: '/images/spiti/spiti-banner-both.webp',
  },
  images: [
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/Spiti2.webp',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/Spiti9.webp',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/spiti3.webp',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/Spit1.webp',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/spiti6.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/spiti7.jpg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/spiti8.jpeg',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/spiti4.webp',
    'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/spiti5.jpeg',
  ],
  metaTitle:
    "Spiti Valley Trip 2024: Explore India's Hidden Gem with Travel Chapes",
  metaDescription:
    'Ready to explore Spiti Valley in 2024? Join Travel Chapes for an unforgettable journey through stunning landscapes, ancient villages, and rich culture.',
  headline: 'Discover Spiti Valley: The Hidden Himalayan Wonder',
  detailDescription: [
    {
      title: 'Spiti Valley Winter Expedition',
      description:
        'Embark on the adventure of a lifetime with the Spiti Valley Winter Expedition 4x4. This 10N/11D journey is a mesmerizing odyssey through the rugged and snow-clad landscapes of Himachal Pradesh. The expedition kicks off from Delhi, with a comfortable Volvo bus ride to Shimla, where the real thrill awaits.',
    },
    {
      title: '4x4 Adventure awaits you.',
      description:
        'In a Mahindra Camper 4x4, youll explore a host of awe-inspiring destinations. From the picturesque Chitkul and Sangla valleys to the ancient Kamru Fort, each day unfolds a new adventure. Traverse serene villages like Nako and Kakti, behold the breathtaking confluence of the Spiti and Sutlej rivers at Khab Sangam, and visit the unique Gue Monastery.',
    },
    {
      title: 'The Best Mountain Locations',
      description:
        'The journey continues through charming villages of Rangrik, Lalung, Hikkim, Komic, Langza, Key, Kibber, Tashigang, Chickam, and Langti Waterfall, providing glimpses into the unspoiled beauty of Spiti. Discover ancient treasures in Tabo, experience serenity in Kalpa, pay your respects at the Bhimakali Temple, and create some amazing memories in Badhal.',
    },
    {
      title: 'Shimla Arrival',
      description:
        'Finally, the expedition circles back to Shimla, leaving you with memories that will last a lifetime. Get ready for an adventure that seamlessly combines adrenaline, culture,and natural beauty, the way only the Spiti Valley can provide.',
    },
  ],

  shortItinerary: [
    {
      day: 'Day 1',
      description: 'Delhi to Shimla | Overnight Adventure',
    },
    {
      day: 'Day 2',
      description: 'Shimla to Chitkul/Sangla - Christmas Eve',
    },
    {
      day: 'Day 3',
      description: 'Chitkul/Sangla to Nako via Raksham & Kamru Fort',
    },
    {
      day: 'Day 4',
      description: 'Nako to Kaza via Gue Monastery & Lingti Waterfall',
    },
    {
      day: 'Day 5',
      description: 'Spiti Sightseeing via Key, Kibber, Chicham, & Tashi Gang',
    },
    {
      day: 'Day 6',
      description:
        'Spiti Sightseeing Day (Hikkim, Komik, Langza, Kakti Village)',
    },
    {
      day: 'Day 7',
      description: 'Kaza to Tabo via Pin Valley, Dhankar, & Lalung Village',
    },
    {
      day: 'Day 8',
      description: 'Tabo to Kalpa via Reckong Peo',
    },
    {
      day: 'Day 9',
      description: 'Kalpa to Badhal New Years Eve Bash in Badhal',
    },
    {
      day: 'Day 10',
      description: 'Badhal to Shimla via Bhimakal',
    },
    {
      day: 'Day 11',
      description: 'Delhi Arrival | Tour Ends',
    },
  ],
  fullItinerary: [
    {
      day: 'Day 1',
      title: 'Delhi to Shimla | Overnight Journey (350km, Around 8 hours)',
      description: `
      - We embark on an exciting journey, starting from a meet-up at the designated pickup point at 07:00 PM.
      - Our trip leader briefs us on what lies ahead.
      - The adventure begins with an overnight drive to Shimla, offering us ample time to rest up for what is to come.
      `,
    },
    {
      day: 'Day 2',
      title: 'Shimla to Sangla/Chitkul (240km, Around 9 hours)',

      description: `
- We leave behind the city hustle and head to Sangla/Chitkul, known as the last village of India.
- En route, we traverse numerous underpasses, treating ourselves to breathtaking vistas of mountains, valleys, and lush meadows.
- Upon reaching Chitkul, we check into our respective rooms or camps.
- The evening brings an unforgettable Christmas Eve celebration, complete with bonfire and music.
`,
    },
    {
      day: 'Day 3',
      title:
        'Chitkul/Sangla to Nako via Raksham and Kamru Fort (150km, Around 5 hours)',
      description: `
      - Our journey continues as we make our way to Nako, renowned for its Star Lake.
      - Along the route, keep your eyes peeled for a potential glimpse of the majestic Chitkul Peak.
      - We indulge in a hike to Kamru Fort, a historical gem in the region.
      - En route to Nako, we pass through Malling Nala and visit the Nako Monastery.
      - We settle into our accommodations, enjoy our dinner, and prepare for a restful night in Nako.
      `,
    },
    {
      day: 'Day 4',
      title:
        'Nako to Kaza Via Gue Monastery and Lingti Waterfall (150km, Around 5 hours)',
      description: `
     - We start the day with an early breakfast as we prepare for our journey to Kaza.
     - Before reaching our destination, we embark on a hike to Chos Khor and walk on the frozen Nako Lake.
     - Our adventure includes a visit to the intriguing Gue Monastery, where a mummified monk resides.
    - While traveling from Gue to Kaza, we take a pause to marvel at the Frozen Lingti Waterfall.
    - Arriving at our accommodations in Kaza, were treated to breathtaking night views.
      `,
    },
    {
      day: 'Day 5',
      title:
        'Spiti Sightseeing Day (Key, Kibber, Chicham, and Tashigang) (50km, Full Day of Sightseeing)',
      description: `
      - The day begins with breakfast as we prepare to explore the heart of Spiti.
      - Our first stop is Key Monastery, a remarkable place of serenity.
      - We proceed to the awe-inspiring Chicham Bridge, Asias highest bridge, and the charming Kibber Village, known as the Snow Leopards second home.
      - Our journey also includes a visit to Tashigang, a village with just 33 residents and the capital of Ibex.
      - We return to Kaza, indulge in a delectable dinner, and then prepare for a cozy night&s rest.
      `,
    },
    {
      day: 'Day 6',
      title:
        'Spiti Sightseeing Day (Hikkim, Komik, Langza, and Kakti Village) (60km, Full Day of Sightseeing)',
      description: `
- After breakfast, were all set for another day of exploration. 
- Our adventures take us to Hikkim, home to the worlds highest post office.
- We then drive to Komic Village, one of the worlds highest motorable village.
- A visit to Langza Village offers a chance to admire its iconic Buddha statue.
- Next is Kakti Village, the worlds smallest village, housing just one family of five, providing an intimate glimpse into the regions unique way of life.
- We return to Kaza, savor dinner, & enjoy a comfortable nights sleep.
`,
    },

    {
      day: 'Day 7',
      title:
        'Kaza to Tabo via Dhankar, Pin Valley, and Lalung Village (70km, Around 3 hours',
      description: `
- After breakfast, we head to Dhankar, which is famous for its ancient Fort, and spend time exploring its historical treasures.
- Our journey continues to Pin Valley, where were advised to bring warm clothing as Lalung Village can get chilly in the evenings.
- Arrangements for accommodations in Tabo have been made in advance for our convenience.
`,
    },
    {
      day: 'Day 8',
      title: 'Tabo to Kalpa via Reckong Peo (165km, Around 5 hours)',
      description: `
      - We begin the day with breakfast and then immerse our selves in the breathtaking views of the Tabo mountains.
     - Prior to setting off, we explore Tabo Monastery and shop for unique souvenirs in Monastery Market.
     - We conclude the day with an overnight stay in Kalpa.
     `,
    },
    {
      day: 'Day 9',
      title: 'Kalpa to Badhal via Kalpa Suicide Point (90km, Around 3 hours)',
      description: `
- After a delicious breakfast, we prepare to visit view points like Kalpa Suicide Point, following safety guidelines to ensure an enjoyable experience.
- We savor the serene surroundings and appreciate the scenic beauty, always showing respect for the local flora and fauna by avoiding littering.
- As we embark on our journey to Badhal, were in for a memorable New Years party.
- Dinner is served, and we spend the night in Badhal.
      `,
    },
    {
      day: 'Day 10',
      title: 'Badhal to Shimla via Bhima Devi Temple  (157km, Around 6 hours)',
      description: `
- After a fulfilling breakfast, we have another opportunity to take in the stunning views of Bhima Devi temple enroute.
- We enjoy the serene atmosphere and the captivating scenic beauty while respecting the local environment.
- Our journey leads us back to Shimla.
- Catch an overnight volvo bus back to delhi.
      `,
    },
    {
      day: 'Day 11',
      title: 'Delhi Arrival | Tour Ends',
      description: `
      - We arrive in Delhi early in the morning, bringing with us cherished memories & unforgettable experiences.
      - Its not just the end of the tour; its the beginning of sharing the incredible stories & moments weve created.
      - Get ready to relive and recount these adventures with your friends, and stay tuned for more epic journeys to come!

      `,
    },
  ],

  inclusions: [
    {
      title: 'Christmas and New Year Celebration',
      description:
        'Christmas and New Year Celebration with festive snacks, music, cake, and a bonfire (weather permitting) to make your trip even more memorable.',
    },
    {
      title: 'Transportation',
      description:
        'Comfortable Tempo Traveller for local transportation in Shimla, ensuring a smooth journey throughout your tour.',
    },
    {
      title: 'Volvo Transfers',
      description:
        'Volvo transfers from Delhi to Shimla and back for a hassle-free start and end to your adventure.',
    },
    {
      title: 'Sightseeing',
      description:
        'All sightseeing will be conducted in a Tempo Traveler, providing comfort and flexibility for the group.',
    },
    {
      title: 'Accommodation',
      description:
        'Accommodation for 6 nights at the best local hotels:\n1 night at Chitkul\n1 night at Nako\n1 night at Tabo\n2 nights at Kaza\n1 night at Kalpa',
    },
    {
      title: 'Meal Plan',
      description:
        'Meal Plan: MAP (Modified American Plan) which includes 12 meals in total (Dinner on Day 2, Breakfast and Dinner on Days 3 to 7, and Breakfast on Day 8).',
    },
    {
      title: 'Permits',
      description:
        'All necessary inner line permits to explore restricted areas like Spiti Valley and Kinnaur.',
    },
    {
      title: 'Driver and Transportation Costs',
      description:
        'Driver Night Charges, Toll Tax, Parking Charges, and all other transportation-related costs are included in the package.',
    },
    {
      title: 'Trip Captain',
      description:
        'A dedicated Team Captain to guide you throughout the trip and ensure your safety and comfort.',
    },
    {
      title: 'Safety Measures',
      description:
        'Essential First Aid Kits, Oximeter, and an Oxygen Cylinder are available 24/7 in the vehicle for emergencies.',
    },
  ],

  exclusions: [
    {
      title: 'GST (5%)',
      description: 'GST (5%) is applicable and will be charged extra.',
    },
    {
      title: 'Early Check-in & Late Check-out',
      description:
        'Charges for any early check-in (before 1:00 PM) or late check-out (after 11:00 AM) at the hotel.',
    },
    {
      title: 'Personal Expenses',
      description:
        'Any extra expenses for personal items such as souvenirs, snacks, or optional activities.',
    },
    {
      title: 'Additional Accommodation/Food Costs',
      description:
        'The cost of any additional stays or meals incurred due to travel delays or unforeseen circumstances.',
    },
    {
      title: 'Lunch',
      description: 'Lunch or any other meals not included in the package.',
    },
    {
      title: 'Airfare/Rail Fare',
      description:
        'Any airfare or rail fare not specified in the package inclusions.',
    },
    {
      title: 'Monument Fees',
      description:
        'Entry fees or parking charges for monuments and sightseeing spots that are not part of the itinerary.',
    },
    {
      title: 'Additional Costs Due to Natural Calamities',
      description:
        'Extra charges arising from unexpected events like flight cancellations, landslides, roadblocks, or other natural calamities.',
    },
    {
      title: 'Other Services',
      description:
        'Any services or expenses not explicitly mentioned in the Inclusions section.',
    },
  ],

  importantPoints: [
    {
      title: 'Winter Travel Advisory',
      description:
        'During the winter months, heavy snowfall can sometimes block access to high-altitude regions like Hikkim, Komik, Langza, and Pin Valley in Spiti Valley. In such cases, we’ll ensure alternate plans are in place so you can still enjoy the beauty and culture of the region.',
    },
    {
      title: 'Travel Arrangements',
      description:
        'Travelers from outside Delhi are advised to book their arrival in Delhi by 4 PM on the trip starting date. For departures, it’s better to book return flights or trains after 2 PM at the trip’s end to allow time for any delays.',
    },
    {
      title: 'Itinerary Changes',
      description:
        'We may adjust the itinerary as needed due to unfavorable weather, inaccessible roads, or participants’ physical limitations. Your safety and comfort will always come first when making such adjustments.',
    },
  ],
}

const batch = [
  {
    date: '23 Dec - 2 Jan',
    transports: [
      {
        type: 'Volvo Bus/4x4 Vehicle',

        costTripleSharing: '35000/-',
        costDoubleSharing: '38000/-',
      },
    ],
  },
]

const DescriptionWithReadMore = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Render when `detailDescription` exists
  if (
    destination.detailDescription &&
    destination.detailDescription.length > 0
  ) {
    const firstDetail = destination.detailDescription[0]
    const truncatedDetail = `${
      firstDetail.title
    }: ${firstDetail.description.slice(0, 200)}...`
    const fullDetail = destination.detailDescription.map((item, index) => (
      <div key={index} className="mb-4">
        {item.title && (
          <h3 className="font-semibold text-xl text-black mb-2">
            {item.title}
          </h3>
        )}
        <p className="text-black">{item.description}</p>
      </div>
    ))

    return (
      <div>
        {!isExpanded && (
          <p className="text-black">
            {truncatedDetail}
            <span
              onClick={handleToggleExpand}
              className="text-blue-500 hover:text-blue-700 cursor-pointer ml-2"
            >
              Read More
            </span>
          </p>
        )}
        {isExpanded && (
          <div>
            {fullDetail}
            <span
              onClick={handleToggleExpand}
              className="text-blue-500 hover:text-blue-700 cursor-pointer mt-2 block"
            >
              Read Less
            </span>
          </div>
        )}
      </div>
    )
  }

  return null
}

const BookingTable = () => {
  const [sharingType, setSharingType] = useState('triple')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const handleSelection = (type) => {
    setSharingType(type)
    setDropdownOpen(false)
  }

  return (
    <div>
      {/* Main Section */}
      <div className="bg-gray-100 h-56 mb-4 rounded-lg overflow-hidden">
        {/* Header
        {details?.optionSec && (
          <div className="text-black text-lg p-2">{details?.route}</div>
        )} */}
        <div className="flex bg-blue-600 text-white sticky top-0 gap-2 text-sm w-full">
          {/* Batches */}
          <div className="flex-1 p-2 rounded-tl-lg flex justify-start items-center">
            Batches
          </div>

          {/* Mode of Vehicle */}
          <div className="flex-1 p-2 whitespace-nowrap flex justify-start items-center">
            Mode of Vehicle
          </div>

          {/* Price with Custom Dropdown */}
          <div className="flex-1 p-2 whitespace-nowrap relative">
            <div
              className="bg-blue-600 text-white px-2 py-1 rounded-md flex items-center cursor-pointer justify-between"
              onClick={toggleDropdown}
            >
              {sharingType === 'triple' ? 'Triple Sharing' : 'Double Sharing'}
              <FaCaretDown className="ml-2" />
            </div>
            {dropdownOpen && (
              <div className="absolute bg-white text-black mt-2 rounded-md shadow-md w-full z-10">
                <div
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelection('triple')}
                >
                  Triple Sharing
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelection('double')}
                >
                  Double Sharing
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="h-48 overflow-y-auto text-sm">
          {batch.map((tour, index) => (
            <div
              key={index}
              className="grid grid-cols-4 text-black border-b gap-2 md:gap-4"
            >
              <div className="p-2 col-span-1 text-black flex flex-col items-center">
                <p>{tour.date}</p>
                <p className="text-orange-500 whitespace-nowrap text-xs md:text-sm bg-orange-200 w-fit px-2 rounded md:rounded-md mt-2">
                  Filling Fast
                </p>
              </div>
              <div className="p-2 col-span-3 text-black">
                {tour.transports.map((vehicle, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 text-black gap-2"
                  >
                    <div className="mb-2 w-full flex justify-start items-center">
                      {vehicle.type}
                    </div>
                    <div className="mb-2 w-full flex justify-center items-center">
                      ₹
                      {sharingType === 'triple'
                        ? vehicle.costTripleSharing
                        : vehicle.costDoubleSharing}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const TravelPackage = ({ destination }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [randomImages, setRandomImages] = useState([])
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const matchedDestination = Trips.find((trip) => trip.id === destination.id)
    setDetails(matchedDestination)
  }, [destination.id])

  const getUniqueImages = (media) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'] // List of valid image extensions
    const isImage = (url) => imageExtensions.some((ext) => url.endsWith(ext)) // Check if the URL ends with a valid image extension

    const images = media.filter((url) => isImage(url)) // Filter only images
    const uniqueSet = new Set()

    while (uniqueSet.size < 3 && uniqueSet.size < images.length) {
      const randomImage = images[Math.floor(Math.random() * images.length)]
      uniqueSet.add(randomImage) // Set will handle duplicates automatically
    }

    return Array.from(uniqueSet) // Convert Set back to Array
  }

  useEffect(() => {
    if (destination.images?.length) {
      setRandomImages(getUniqueImages(destination.images))
    }
  }, [destination?.id])
  // Function to open the modal
  const openModal = () => setModalOpen(true)

  // Function to close the modal
  const closeModal = () => setModalOpen(false)
  return (
    <div className="container mx-auto ">
      {/* Title */}
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-black">
          {destination.title} Overview
        </h2>
        <section className="my-12">
          <DescriptionWithReadMore destination={destination} />
        </section>
      </div>
      {/* Left Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Image Gallery */}
          <div className="flex space-x-4 mb-6">
            {randomImages.map((image, index) => (
              <div
                key={index}
                className="w-24 h-36 md:w-32 md:h-48 rounded-full overflow-hidden"
              >
                <Image
                  src={image}
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
              <p className="text-blue-600">Delhi & Delhi</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Category</p>
              <p className="text-blue-600">Special Flagship Trip</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Duration</p>
              <p className="text-blue-600">11D & 10N</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-2 md:p-4">
              <p className="text-sm font-medium text-gray-800">Age Group</p>
              <p className="text-blue-600">20-40</p>
            </div>
          </div>

          {/* Inclusions */}
          <p className="my-4 text-black">Inclusions</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-yellow-600 p-4 flex justify-center items-center rounded-md text-center text-sm min-h-[80px]">
              <p>Meals</p>
            </div>
            <div className="bg-yellow-600 p-4 flex justify-center items-center rounded-md text-center text-sm min-h-[80px]">
              <p>Stays</p>
            </div>
            <div className="bg-yellow-600 p-4 flex justify-center items-center rounded-md text-center text-sm min-h-[80px]">
              <p>Transfers</p>
            </div>
            <div className="bg-yellow-600 p-4 flex justify-center items-center rounded-md text-center text-sm min-h-[80px]">
              <p>Qualified Captains</p>
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
                <p className="text-3xl flex justify-center items-center mb-3">
                  💳
                </p>
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
                Affordable <br /> Prices
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
            <p className="text-lg font-semibold text-black">Starts From</p>
            {/* <div className="flex items-center space-x-2">
              <span className="text-red-500 line-through text-sm">₹9,000</span>
              <span className="bg-green-100 text-green-500 text-xs px-2 py-1 rounded-md">
                20% Off
              </span>
            </div> */}
            <p className="text-4xl font-bold text-blue-600 mt-2">₹35,000</p>

            <p className="text-sm text-gray-500">Per Person</p>
          </div>

          {/* Book Now Button */}
          <button
            onClick={openModal}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold mb-6"
          >
            Book Now
          </button>

          {/* Availability Table */}
          <BookingTable />
        </div>
      </div>
      {isModalOpen && <TripModal onClose={closeModal} />}
    </div>
  )
}

const Itinerary = ({ shortItinerary, fullItinerary }) => {
  const [expandedDay, setExpandedDay] = useState(null)

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day)
  }

  return (
    <div className="bg-gray-50 p-2 md:p-6 w-full max-w-screen-xl mx-auto rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Itinerary</h2>
      <div className="space-y-4">
        {shortItinerary.map((item, index) => (
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
                  <p className="whitespace-pre-line">
                    {fullItinerary[index].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ImagesGrid = ({ images }) => {
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
const ImagesSlider = ({ images }) => {
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

const InclusionsExclusions = ({ inclusions, exclusions }) => {
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
              <div key={index} className="flex items-start">
                <span className="h-3 w-3 bg-green-800 rounded-full mt-[6px] mr-3 flex-shrink-0"></span>
                <div className="text-gray-700">
                  <strong className="text-gray-800">{item.title}:</strong>{' '}
                  {item.description}
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
                  <strong className="text-gray-800">{item.title}:</strong>{' '}
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

const ImportantPoints = ({ points }) => {
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
  return (
    <div className="w-full max-w-screen-xl mx-auto p-6 space-y-8">
      {/* Testimonials Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-semibold">Testimonials</h2>
        <p className="text-gray-500">The word on the street</p>
      </div>

      {/* Rating Icons */}
      <div className="flex justify-around md:justify-center md:space-x-10 items-center py-4">
        {[
          {
            icon: '/images/google_logo.webp',
            rating: 4.9,
            reviews: 120,
          },
          {
            icon: '/images/trip_logo.webp',
            rating: 4.9,
            reviews: 40,
          },
          {
            icon: '/images/facebook_logo.webp',
            rating: 5.0,
            reviews: 89,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-2 w-24 md:w-28"
          >
            <Image
              src={item.icon}
              width={100}
              height={100}
              alt="Rating Icon"
              className="w-auto h-12 md:h-16 object-contain"
            />
            <p className="font-semibold text-black text-sm md:text-base">
              {item.rating} 🌟
            </p>
            <p className="text-gray-500 text-xs md:text-sm">
              ({item.reviews} reviews)
            </p>
          </div>
        ))}
      </div>

      {/* Review Cards */}
      <section>
        <div className="w-full max-w-lg mx-auto p-6 space-y-8">
          <Image
            src="/images/reviews/review1.webp"
            alt="testimonial"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  )
}

const Page = () => {
  const [randomQuote, setRandomQuote] = useState('')
  const quotes = [
    'Adventures and memories',
    'Explore the unexplored',
    'Wander often, wonder always',
    'Life is short, travel more',
    'Collect moments, not things',
    "Discover nature's beauty",
    'Let the journey begin',
    'Adventure awaits',
    'Escape the ordinary',
    'Find your path',
  ]
  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center  text-white relative">
      {/* Hero Section */}
      <section
        className="relative w-full h-[calc(100vh-4rem)]  bg-cover bg-center bg-gray-500"
        style={{
          backgroundImage: `url('${destination.banners.web}')`,
        }}
      >
        {/* Top left glass effect text */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-white bg-opacity-20 text-white px-2 py-1 md:px-4 md:py-2 rounded-md backdrop-blur-lg">
          <p className="text-md font-light">&quot;{randomQuote}&quot;</p>
        </div>

        {/* Top right overlayed image */}
        <div className="absolute top-16 right-4 md:top-16 md:right-4 h-1/3 w-1/2 md:h-1/2 md:w-1/3 bg-cover rounded-lg overflow-hidden">
          <Image
            src={destination.images[2]}
            alt="Place"
            width={400}
            height={400}
            className="w-full h-full  max-h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Small text below the right image */}
        <div className="absolute bottom-56 right-4 md:bottom-32 md:right-4 text-xs font-thin w-2/3 md:w-1/3 bg-black bg-opacity-30 text-gray-300 px-2 py-1 md:px-4 md:py-2 rounded-md backdrop-blur-sm">
          <p>{destination.metaDescription}</p>
        </div>

        {/* Overlapping circular images */}
        <div className="absolute bottom-28 right-4 md:bottom-12 md:right-16 flex -space-x-2">
          {destination.images.slice(1, 4).map((url, index) => {
            const isImage = /\.(jpg|jpeg|png|webp)$/i.test(url) // Check if the URL is an image
            return (
              <div
                key={index}
                className={`w-10 h-10 md:w-12 md:h-12 ${
                  index === 0
                    ? 'bg-gray-400'
                    : index === 1
                    ? 'bg-gray-300'
                    : 'bg-gray-200'
                } rounded-full overflow-hidden`}
              >
                {isImage ? (
                  <Image
                    src={url}
                    alt={`Media ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <video
                    src={url}
                    controls={false}
                    autoPlay
                    loop
                    muted
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Place name at the bottom left */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {destination.title}
          </h1>
        </div>
      </section>
      <section className="my-12 w-full">
        <TravelPackage destination={destination} />
      </section>
      <section className="my-12 w-full">
        <Itinerary
          shortItinerary={destination.shortItinerary}
          fullItinerary={destination.fullItinerary}
        />
      </section>
      <section className=" w-full">
        <Image
          src="/images/homepage/gallery_font.svg"
          width={1000}
          height={1000}
          alt="gallery"
          className="w-full h-full object-cover p-4 max-w-screen-xl mx-auto"
        />
      </section>
      <section className="my-12 w-full hidden md:block">
        <ImagesGrid images={destination.images} />
      </section>
      <section className="my-12 w-full md:hidden">
        <ImagesSlider images={destination.images} />
      </section>
      <section className="my-12 w-full">
        <InclusionsExclusions
          inclusions={destination.inclusions}
          exclusions={destination.exclusions}
        />
      </section>
      <section className="my-12 w-full">
        <ImportantPoints points={destination.importantPoints} />
      </section>
      <section className="my-12 w-full">
        <Testimonials />
      </section>
    </div>
  )
}

export default Page
