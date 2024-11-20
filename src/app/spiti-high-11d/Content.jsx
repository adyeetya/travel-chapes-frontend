'use client'

import React, { useState, use, useEffect } from 'react'
import Image from 'next/image'

import { Trips } from '@/data/destinations/details'
import { CiCircleChevDown } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'



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
  description:
    "Spiti Valley is located between Kunzum La and the lush Lahaul Valley. Some people may call it a mini-Ladakh. It's a very high-altitude desert and is a haven for all nature lovers, adventure maniacs, and culture explorers. Spiti is a truly offbeat escape from crowds as it has Unique Tibetan Buddhist monasteries, picturesque villages, and barren landscapes. The Spiti River breeze past whitewashed mud-brick homes and thriving barley fields, while monasteries cling to cliffs high above. The journey through the valley, including the dramatic Spiti-Kinnaur road trip, is one of the most scenic and thrilling in Asia. /n So it is an ideal escape for those who want to explore an unbelievably serene, unspoiled destination. The magic of Spiti Valley,its rugged beauty and ancient Tibetan culture is waiting for you.",
  shortItinerary: [
    {
      day: 'Day 1',
      description: 'Delhi to Jibhi | Overnight Journey',
    },
    {
      day: 'Day 2',
      description: 'Jibhi Arrival | Bike Introduction | Day at Leisure',
    },
    {
      day: 'Day 3',
      description: 'Jibhi to Chitkul | Jalori Pass (214 Kms) 8hrs',
    },
    {
      day: 'Day 4',
      description:
        'Chitkul to Kalpa | sucide point | kinner kailash view (60Kms) 4 hrs',
    },
    {
      day: 'Day 5',
      description:
        'Kalpa to Dhankar | Khab Sangam | Nako Village | Tabo monastery (200 Kms) 8 hrs',
    },
    {
      day: 'Day 6',
      description: 'Dhankar to Kaza | Pin Valley | Local Market (40 Kms) 5 hrs',
    },
    {
      day: 'Day 7',
      description:
        'Spiti Sightseeing Day | Hikkim, Komic, langza | Key Monastery, Chicham Bridge',
    },
    {
      day: 'Day 8',
      description: 'Kaza to Chandratal | Kunzum Pass | (90 Kms)',
    },
    {
      day: 'Day 9',
      description: 'Chandratal to Manali (125 Kms)',
    },
    {
      day: 'Day 10',
      description: 'Manali Leisure Day | Old Manali ',
    },
    {
      day: 'Day 11',
      description: 'Delhi Arrival | Tour Ends ',
    },
  ],
  fullItinerary: [
    {
      day: 'Day 1',
      title: 'Delhi to Jibhi | Overnight Journey',
      description: `
- By around 7:00 PM, we'll gather at the pickup point.
- The anticipation rises as we introduce the team captains, setting the stage for an exciting journey.
- Embarking on an overnight adventure to Jibhi awaits us, with Majnu Ka Tila as our tentative pickup point.
      `,
    },
    {
      day: 'Day 2',
      title: 'Jibhi Arrival | Bike Introduction | Day at Leisure',

      description: `
- Travelers opting for the Tempo Traveller will disembark at Aut Tunnel, making their way directly to Jibhi.
- Meanwhile, those on the Bike Trip will head to Manali, where bikes await them for a test run before joining us in Jibhi.
- Upon arriving at Jibhi, the welcoming embrace of our designated hotel awaits, promising a night of camaraderie, dinner, and relaxation.
      `,
    },
    {
      day: 'Day 3',
      title: '',
      description: `
     - Awaking to the melody of birdsong after a serene night, we indulge in a delightful breakfast.
     - Checking out, we set forth toward Chitkul, the Last Village on the India-China Border, passing through the enchanting Jalori Pass.
     - Nestling into our respective hotels in Chitkul, we cap off the day with dinner and an overnight stay.
       `,
    },
    {
      day: 'Day 4',
      title:
        'Chitkul to Kalpa | sucide point | kinner kailash view (60Kms) 4 hrs',
      description: `
     - Following breakfast, our journey unfolds towards Kalpa, famed for its scenic vistas.
     - En route, Reckong Peo beckons, offering a potential glimpse of the majestic Kinner Kailash Peak if the weather permits.
     - Kalpa welcomes us with leisure moments, followed by a visit to the ancient Kalpa Monastery and the awe-inspiring Suicide Point.
     - Dinner and an overnight stay in the tranquil ambiance of Kalpa conclude the day.
      `,
    },
    {
      day: 'Day 5',
      title:
        'Kalpa to Dhankar | Khab Sangam | Nako Village | Tabo monastery (200 Kms) 8 hrs',
      description: `
      - With an early morning start, we venture toward Dhankar, the historical capital of Spiti Valley.
      - Halting at Khab, the confluence of Sutlej and Spiti rivers, and passing through Nako Village and Tabo Monastery, our journey unfolds.
      - Upon reaching Dhankar, we delve into its rich history and culture through an enlightening session with a local guide, followed by dinner and a night's stay.
      `,
    },
    {
      day: 'Day 6',
      title: 'Dhankar to Kaza | Pin Valley | Local Market (40 Kms) 5 hrs',
      description: `
- After a nourishing breakfast, we explore the wonders of Dhankar Monastery and Fort, offering mesmerizing valley views.
- Journeying towards Kaza, our route includes a visit to Mud village in Pin Valley.
- Upon arriving in Kaza, we check into our stay, inviting travelers to partake in the delightful cafe scene in Kaza Market.
- The day concludes with dinner and an overnight stay in Kaza.    `,
    },
    {
      day: 'Day 7',
      title:
        'Spiti Sightseeing Day | Hikkim, Komic, langza | Key Monastery, Chicham Bridge',
      description: `
- Post breakfast, our exploration takes us to Key Monastery, Chicham Bridge, and the record-holding Hikkim post office.
- Continuing our adventure, we visit Komic village, Langza, and the captivating Buddha statue atop a hill.
- Returning to Kaza, we wrap up the day with dinner and an overnight stay, reveling in the day's discoveries.
 `,
    },
    {
      day: 'Day 8',
      title: 'Kaza to Chandratal | Kunzum Pass | (90 Kms)',
      description: `
- After breakfast, we set out for the pristine Chandratal, a crescent-shaped lake resembling the moon, traversing the iconic Kunzum Pass.
- Upon reaching our designated campsites, we check in, spending leisure time by the enchanting Chandratal Lake.
- The evening brings dinner, creating lasting memories amidst the natural beauty, or an alternative stay if weather conditions close the roads to Chandratal.
    `,
    },
    {
      day: 'Day 9',
      title: 'Chandratal to Manali (125 Kms)',
      description: `
- Checking out from our campsites, we head to Manali via the iconic Atal Tunnel.
- On reaching Manali, we bid farewell to our bikes and settle into our designated stay, followed by dinner and a night's rest.
`,
    },
    {
      day: 'Day 10',
      title: 'Manali Leisure Day | Old Manali',
      description: `
- A leisurely morning breakfast paves the way for a day at leisure.
- Travelers are encouraged to explore the vibrant cafe culture, local market, and Mall Road.
- As evening falls, an overnight bus journey from Manali to Delhi awaits, concluding our time in Manali    `,
    },
    {
      day: 'Day 11',
      title: 'Delhi Arrival | Tour Ends',
      description: `
      - Reaching Delhi, we part ways, cherishing the camaraderie forged during this unforgettable journey.
      - The echoes of our shared adventures linger as the tour gracefully comes to an end.
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

const DescriptionWithReadMore = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Truncate the text to 200 characters
  const truncatedDescription = description.slice(0, 200)

  // Display either the full or truncated description
  const displayText =
    isExpanded || description.length <= 200 ? description : truncatedDescription

  return (
    <div>
      <p className="text-black">
        {displayText.split('/n').map((paragraph, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />} {/* Add a line break between paragraphs */}
            {paragraph}
          </React.Fragment>
        ))}
        {!isExpanded && description.length > 200 && (
          <span className="text-black">...</span>
        )}
        {description.length > 200 && (
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700 mt-2 cursor-pointer ml-4 whitespace-nowrap"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </span>
        )}
      </p>

      {/* Show "Read More" button */}

      {/* Show "..." when description is truncated */}
    </div>
  )
}

const TripModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelers: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const sendToWhatsApp = () => {
    const message = `Hello, I would like to plan a trip.
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Number of Travelers: ${formData.travelers}`

    const whatsappURL = `https://wa.me/+918650500202?text=${encodeURIComponent(
      message
    )}`
    window.open(whatsappURL, '_blank')
  }

  const sendToEmail = () => {
    const subject = `Trip Planning Inquiry`
    const body = `Hello,\n\nI would like to plan a trip.\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nNumber of Travelers: ${formData.travelers}`

    const mailtoURL = `mailto:contact@travelchapes.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    window.open(mailtoURL, '_blank')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendToWhatsApp() // Or call sendToEmail()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-4/5 lg:max-w-4xl flex flex-col-reverse md:flex-row h-auto md:h-[65vh] lg:h-[90vh] max-h-[665px]">
        <button
          onClick={onClose}
          className="text-black z-50 absolute top-4 right-4 bg-red-300 rounded-full p-2 hover:bg-red-400 focus:outline-none"
        >
          <IoClose size={24} />
        </button>

        {/* Left Form Section */}
        <div className="md:w-1/2 p-6 h-full overflow-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">
            PLAN YOUR NEXT TRIP
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-xs md:text-sm mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs md:text-sm mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs md:text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs md:text-sm mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-xs md:text-sm mb-2">
                Number of Travelers
              </label>
              <input
                type="number"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                placeholder="Number of Travelers"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white mt-6 py-3 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Start Journey
            </button>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 h-56 md:h-full relative">
          <Image
            src="/images/homepage/modalimg.jpg" // Replace with your image URL
            alt="Trip Preview"
            width={1000}
            height={1000}
            className="object-cover w-full h-full rounded-lg md:rounded-l-none md:rounded-r-lg"
          />
          <div className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50 text-white text-center">
            <h3 className="text-lg font-semibold">We are a Family</h3>
            <p className="text-sm">
              In camp we have a lot of people with different life stories that
              help you feel more at home during the trip.
            </p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {[
                '#happytravel',
                '#adventure',
                '#explore',
                '#family',
                '#travel',
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
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
        {/* If description exists, render the DescriptionWithReadMore component */}
        {destination.description && (
          <DescriptionWithReadMore description={destination.description} />
        )}

        {/* If detailDescription exists, render it as a list of titles and descriptions */}
        {destination.detailDescription &&
          destination.detailDescription.length > 0 && (
            <div>
              {destination.detailDescription.map((item, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-xl text-black">
                    {item.title}
                  </h3>
                  <DescriptionWithReadMore description={item.description} />
                </div>
              ))}
            </div>
          )}
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
            <p className="text-lg font-semibold text-black">Starts From</p>
            {/* <div className="flex items-center space-x-2">
              <span className="text-red-500 line-through text-sm">₹9,000</span>
              <span className="bg-green-100 text-green-500 text-xs px-2 py-1 rounded-md">
                20% Off
              </span>
            </div> */}
            <p className="text-4xl font-bold text-blue-600 mt-2">
              ₹{details?.minPrice}{' '}
              {details?.optionSec && (
                <span className="text-sm text-black font-normal">
                  /{details.route}
                </span>
              )}
            </p>
            {details?.optionSec && (
              <p className="text-4xl font-bold text-blue-600 mt-2">
                ₹{details?.optionSec.minPriceSec}{' '}
                {details?.optionSec && (
                  <span className="text-sm text-black font-normal">
                    /{details?.optionSec.routeSec}
                  </span>
                )}
              </p>
            )}
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
          <div className="bg-gray-100 h-56 mb-4 rounded-lg overflow-hidden">
            {/* Header */}
            {details?.optionSec && (
              <div className="text-black text-lg p-2">{details?.route}</div>
            )}
            <div className="grid grid-cols-4 bg-blue-600 text-white sticky top-0 gap-2 text-sm">
              <div className="p-2 rounded-tl-lg">Batches</div>
              <div className="p-2 whitespace-nowrap">Mode of Vehicle</div>
              <div className="p-2 whitespace-nowrap">Triple Sharing</div>
              <div className="p-2 rounded-tr-lg whitespace-nowrap">
                Double Sharing
              </div>
            </div>

            {/* Scrollable content */}
            <div className="h-48 overflow-y-auto text-sm">
              {details &&
                details.batch.map((tour, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4  text-black border-b gap-4"
                  >
                    <div className="p-2 col-span-1 text-black flex flex-col items-center">
                      <p>{tour.date}</p>
                      <p className="text-orange-500 text-sm bg-orange-200 w-fit px-2 rounded-md mt-2">
                        Filling Fast
                      </p>
                    </div>
                    <div className="p-2 col-span-3 text-black">
                      {tour.transports.map((vehicle, index) => {
                        return (
                          <div
                            key={index}
                            className="grid grid-cols-3 text-black gap-2"
                          >
                            <div className="mb-2  w-full flex justify-start items-center">
                              {vehicle.type}
                            </div>
                            <div className="mb-2  w-full flex justify-center items-center">
                              ₹{vehicle.costTripleSharing}
                            </div>
                            <div className="mb-2  w-full flex justify-center items-center">
                              ₹{vehicle.costDoubleSharing}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {details?.optionSec && (
            <div className="bg-gray-100 h-56 mt-4 rounded-lg overflow-hidden">
              {/* Header */}
              {details?.optionSec && (
                <div className="text-black text-lg p-2">
                  {details?.optionSec.routeSec}
                </div>
              )}
              <div className="grid grid-cols-4 bg-blue-600 text-white sticky top-0 gap-2 text-sm">
                <div className="p-2 rounded-tl-lg">Batches</div>
                <div className="p-2">Mode of Vehicle</div>
                <div className="p-2">Triple Sharing</div>
                <div className="p-2 rounded-tr-lg">Double Sharing</div>
              </div>

              {/* Scrollable content */}
              <div className="h-40 overflow-y-auto text-sm">
                {details?.optionSec &&
                  details.optionSec.batchSec.map((tour, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4  text-black border-b gap-4"
                    >
                      <div className="p-2 col-span-1 text-black flex flex-col items-center">
                        <p>{tour.date}</p>
                        <p className="text-orange-500 text-sm bg-orange-200 w-fit px-2 rounded-md mt-2">
                          Filling Fast
                        </p>
                      </div>
                      <div className="p-2 col-span-3 text-black">
                        {tour.transports.map((vehicle, index) => {
                          return (
                            <div
                              key={index}
                              className="grid grid-cols-3 text-black gap-2"
                            >
                              <div className="mb-2  w-full flex justify-start items-center">
                                {vehicle.type}
                              </div>
                              <div className="mb-2  w-full flex justify-center items-center">
                                ₹{vehicle.costTripleSharing}
                              </div>
                              <div className="mb-2  w-full flex justify-center items-center">
                                ₹{vehicle.costDoubleSharing}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
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
      <section className="my-12 w-full">
        <Image
          src="/images/homepage/gallery_font.svg"
          width={1000}
          height={1000}
          alt="gallery"
          className="w-full h-full object-cover p-4 max-w-screen-xl"
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
