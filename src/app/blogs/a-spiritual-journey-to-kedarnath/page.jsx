import React from 'react'
import Image from 'next/image'

const KedarnathBlog = () => {
  return (
    <div className="bg-gray-100 py-10 px-4">
      {/* Header Section */}
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          A Spiritual Journey to Kedarnath: Everything You Need to Know!
        </h1>
        <p className="text-lg text-gray-700">
          Embark on a transformative journey to one of India&apos;s most sacred
          destinations. Find everything you need to plan your trip to Kedarnath.
        </p>
        <div className="mt-6">
          <Image
            src="/images/blogs/kedarnath.webp"
            alt="Kedarnath Temple"
            width={1200}
            height={600}
            className="rounded-lg shadow-lg object-cover w-full"
          />
        </div>
      </header>

      {/* Main Content Section */}
      <main className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-2 md:p-6">
        {/* Introduction */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kedarnath, one of the most sacred journey destinations in India, is
            located in the serene Himalayas of Uttarakhand. Known for its
            spiritual value and the beauty of nature, a Kedarnath trip is indeed
            a life-altering experience.
          </p>
        </section>

        {/* Significance of Kedarnath Temple */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">
            Significance of Kedarnath Temple
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Kedarnath Temple, dedicated to Lord Shiva, is one of the 12
            Jyotirlingas and a prime part of the Char Dham Yatra. Located at an
            altitude of 3,584 meters (11,763 feet), the temple is historically
            and spiritually significant.
          </p>
        </section>

        {/* Kedarnath Trek */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">
            The Kedarnath Trek: A Blend of Faith and Adventure
          </h2>

          <p className="text-gray-700 leading-relaxed">
            The 16 km trek from Gaurikund to the temple combines elements of
            spiritual reflection and physical endurance. Trekkers navigate
            through stunning landscapes, dense forests, and rushing streams,
            taking about 6–8 hours to complete the challenging but rewarding
            journey.
          </p>
        </section>

        {/* Best Time to Visit */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">
            Best Time to Visit Kedarnath
          </h2>

          <p className="text-gray-700 leading-relaxed">
            The ideal time to visit Kedarnath is during the summer (May–June)
            and post-monsoon (September–November) seasons. These months offer
            clear skies, moderate temperatures, and favorable conditions for
            trekking.
          </p>
        </section>

        {/* Key Attractions Around Kedarnath */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Key Attractions Around Kedarnath
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div>
              <Image
                src="/images/blogs/kaal-bhairav.webp"
                alt="Bhairav Temple"
                width={600}
                height={400}
                className="rounded-lg h-[300px] shadow-md object-cover"
              />
              <p className="text-gray-700 mt-2">
                <strong>Bhairav Temple:</strong> Located 2 km from the main
                temple, this site offers panoramic views and is dedicated to
                Lord Bhairav.
              </p>
            </div>
            <div>
              <Image
                src="/images/blogs/vasuki-Tal.webp"
                alt="Vasuki Tal"
                width={600}
                height={400}
                className="rounded-lg h-[300px] shadow-md object-cover"
              />
              <p className="text-gray-700 mt-2">
                <strong>Vasuki Tal:</strong> A serene lake at 4,135 meters,
                surrounded by snow-covered peaks.
              </p>
            </div>
            <div>
              <Image
                src="/images/blogs/gauri-kund.webp"
                alt="Gauri Kund"
                width={600}
                height={400}
                className="rounded-lg h-[300px] shadow-md object-cover"
              />
              <p className="text-gray-700 mt-2">
                <strong>Gauri Kund:</strong> The starting point of the trek to
                Kedarnath, known for its hot springs.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">
            Conclusion
          </h2>
          <p className="text-gray-700 leading-relaxed">
            A trip to Kedarnath combines adventure and spirituality like no
            other. Whether trekking through rugged terrains or experiencing the
            divine aura of the temple, this journey promises memories for a
            lifetime.
          </p>
        </section>
      </main>
    </div>
  )
}

export default KedarnathBlog
