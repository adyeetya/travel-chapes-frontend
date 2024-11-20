import React from 'react'
import Content from './Content'
import { destinations } from '@/data/destinations/destinations'

export async function generateMetadata({ params }) {
  const { place } = await params
  const destination = destinations.find((dest) => dest.id === place)

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
  }
}
const page = async ({ params }) => {
  const { place } = await params
  const destination = destinations.find((dest) => dest.id === place)
  return (
    <div>
      <Content destination ={destination}/>
    </div>
  )
}

export default page
