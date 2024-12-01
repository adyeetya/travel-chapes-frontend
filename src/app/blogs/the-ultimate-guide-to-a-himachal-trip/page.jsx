import Image from 'next/image'
import Link from 'next/link'

export default function HimachalTripGuide() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header Section */}
      <header className="relative bg-blue-900 text-white">
        <div className="container mx-auto py-12 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            The Ultimate Guide to a Himachal Trip
          </h1>
          <p className="text-lg text-yellow-400">
            Plan an unforgettable journey through the paradise of the northern
            Himalayas.
          </p>
        </div>
      </header>

      {/* Introduction */}
      <section className="py-12 px-6 container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Best Time to Visit Himachal Pradesh
        </h2>
        <p className="mb-4">
          Himachal Pradesh is a year-round destination. Choose the best time
          based on your preferences:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Summer (March to June):</strong> Best time to explore hill
            stations with pleasant weather and lush greenery.
          </li>
          <li>
            <strong>Monsoon (July to September):</strong> Ideal for budget
            travelers, but be cautious of potential landslides.
          </li>
          <li>
            <strong>Winter (October to February):</strong> Experience snow in
            places like Manali, Kufri, and Spiti Valley.
          </li>
        </ul>
      </section>

      {/* Places to Visit */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">
            Top Places to Visit in Himachal Pradesh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Manali',
                url: '/destination/himachal-backpacking-trip-manali-kasol-jibhi',
                description:
                  'A haven for nature lovers and adventure junkies. Explore Solang Valley, Rohtang Pass, and Hadimba Temple.',
                img: 'https://travelchapes.s3.eu-north-1.amazonaws.com/images/manali/manali1.webp',
              },
              {
                title: 'Shimla',
                url: '/destination/spiti-valley',
                description:
                  "The 'Queen of Hills' boasts colonial architecture, bustling markets, and scenic toy train rides.",
                img: 'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/spiti3.webp',
              },
              {
                title: 'Dharamshala and McLeod Ganj',
                url: '/christmas-special/himachal-high',
                description:
                  "Spiritual havens with attractions like the Dalai Lama's residence, Bhagsu Waterfall, and Triund Trek.",
                img: 'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/Spiti2.webp',
              },
              {
                title: 'Kasol and Parvati Valley',
                url: '/destination/kasol-to-tosh',
                description:
                  "Backpackers' paradise with serene views, vibrant culture, and treks like Kheerganga.",
                img: 'https://travelchapes.s3.eu-north-1.amazonaws.com/images/kasol_rudrarg/kasol1.webp',
              },
              {
                title: 'Spiti Valley',
                url: '/destination/spiti-valley',
                description:
                  "An adventurer's paradise with stark landscapes, ancient monasteries, and thrilling road trips.",
                img: 'https://travelchapes.s3.eu-north-1.amazonaws.com/images/Spiti/spiti4.webp',
              },
            ].map(({ title, description, img, url }, index) => (
              <div
                key={index}
                className="bg-gray-100 shadow-md rounded-lg overflow-hidden"
              >
                <div className="h-48 bg-cover bg-center relative">
                  <Image
                    src={img}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-48"
                  />
                </div>
                <div className="p-4">
                  <Link href={url}>
                    <h3 className="text-lg font-bold mb-2 hover:underline">
                      {title}
                    </h3>
                  </Link>
                  <p className="text-gray-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adventure Activities */}
      <section className="py-12 px-6 container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Adventure Activities in Himachal
        </h2>
        <p className="mb-4">
          Himachal is a paradise for adventure lovers. Try these activities:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Trekking:</strong> Explore trails like Hampta Pass, Beas
            Kund, and Bhrigu Lake.
          </li>
          <li>
            <strong>River Rafting:</strong> Experience rafting in the Beas and
            Sutlej rivers.
          </li>
          <li>
            <strong>Skiing:</strong> Glide through snow at Solang Valley and
            Kufri.
          </li>
          <li>
            <strong>Camping:</strong> Spend a night under the stars in places
            like Bir Billing and Tirthan Valley.
          </li>
        </ul>
      </section>

      {/* Travel Tips */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">
            Travel Tips for Himachal Pradesh
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pack appropriately for the weather and activities.</li>
            <li>Consider private cabs for offbeat locations.</li>
            <li>Make advance bookings during peak seasons.</li>
            <li>Respect nature and maintain ecological cleanliness.</li>
            <li>Carry basic medicines for health precautions.</li>
          </ul>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-12 px-6 container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          How to Reach Himachal Pradesh
        </h2>
        <p className="mb-4">Choose the mode of travel that suits you best:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>By Air:</strong> Nearest airports are Chandigarh, Bhuntar
            (Kullu), and Gaggal (Dharamshala).
          </li>
          <li>
            <strong>By Train:</strong> The Kalka-Shimla toy train offers scenic
            views and nostalgia.
          </li>
          <li>
            <strong>By Road:</strong> Well-connected with buses and private
            taxis. Self-drive enthusiasts should drive cautiously.
          </li>
        </ul>
      </section>

      {/* Conclusion */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto text-center px-6">
          <p className="text-lg">
            Himachal Pradesh is the perfect destination for nature lovers,
            adventure seekers, and cultural enthusiasts. Plan your trip and
            create unforgettable memories!
          </p>
        </div>
      </footer>
    </div>
  )
}
