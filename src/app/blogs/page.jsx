import React from 'react'
import Link from 'next/link'

const blogs = [
  {
    id: 1,
    title: 'The Ultimate Guide to a Himachal Trip',
    description:
      'Plan an unforgettable journey through the paradise of the northern Himalayas.',
    slug: 'the-ultimate-guide-to-a-himachal-trip',
  },
  {
    id: 2,
    title: 'A Spiritual Journey to Kedarnath: Everything You Need to Know!',
    description:
      'Discover the spiritual and adventurous journey to Kedarnath, nestled in the Himalayas of Uttarakhand.',
    slug: 'a-spiritual-journey-to-kedarnath',
  },
]

const BlogList = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold">Blog Listing</h1>
          <p className="mt-2">Explore our latest travel blogs and guides.</p>
        </div>
      </header>

      <main className="py-10 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="text-blue-600 hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default BlogList
