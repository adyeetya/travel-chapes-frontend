'use client'
import React, { useState, useRef, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../ui/carousel'
const reviewsData = [
  {
    id: 1,
    title: 'Great Product!',
    description: 'This product really helped me a lot. Highly recommend!',
    videoUrl: '/videos/review-vid1.mp4',
  },
  {
    id: 2,
    title: 'Amazing Experience!',
    description: 'I had an amazing experience with this product. Five stars!',
    videoUrl: '/videos/videoplayback.mp4',
  },
  {
    id: 3,
    title: 'Amazing Experience!',
    description: 'I had an amazing experience with this product. Five stars!',
    videoUrl: '/videos/videoplayback.mp4',
  },
  {
    id: 4,
    title: 'Amazing Experience!',
    description: 'I had an amazing experience with this product. Five stars!',
    videoUrl: '/videos/videoplayback.mp4',
  },
  {
    id: 5,
    title: 'Great Product!',
    description: 'This product really helped me a lot. Highly recommend!',
    videoUrl: '/videos/review-vid1.mp4',
  },

  // Add more review objects as needed
]

const Reviews = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const videoRefs = useRef({})

  const handlePlayPause = (id) => {
    setPlayingVideoId((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((videoId) => {
      const videoElement = videoRefs.current[videoId]
      if (videoElement) {
        if (parseInt(videoId) === playingVideoId) {
          videoElement.play()
        } else {
          videoElement.pause()
        }
      }
    })
  }, [playingVideoId])

  return (
    <div className=" my-12">
      <div className="p-4 md:py-6 max-w-screen-xl mx-auto mb-8 text-center">
        <h2 className="text-3xl font-bold">
          Feel-Good{' '}
          <span className="text-[#fbd354] font-bold tracking-wide text-4xl">
            Feedback
          </span>
        </h2>
        <p className="text-sm text-gray-600">
          See what our customers have to say about us.
        </p>
      </div>

      <div className="bg-[#fbd354] py-24 w-full h-full">
        <Carousel
          opts={{
            loop: true,
            align: 'start',
          }}
          className="w-full p-4 px-12 md:py-6 max-w-screen-xl mx-auto"
        >
          <CarouselContent className="-ml-1">
            {reviewsData.map((review) => (
              <CarouselItem
                key={review.id}
                className=" rounded-lg md:basis-1/2 lg:basis-1/4 px-4"
              >
                <div className="relative pb-[160%]">
                  <video
                    ref={(element) => (videoRefs.current[review.id] = element)}
                    src={review.videoUrl}
                    controls={false}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                    loop
                    playsInline
                  />
                  <button
                    onClick={() => handlePlayPause(review.id)}
                    className="absolute inset-0 flex items-center justify-center bg-transparent"
                  >
                    <div className="glass-effect-button rounded-full p-2">
                      {playingVideoId === review.id ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                          className="w-12 h-12"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M10 9v6m4-6v6"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                          className="w-12 h-12"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M14.752 11.168l-5.197-3.132A1 1 0 008 8.868v6.264a1 1 0 001.555.832l5.197-3.132a1 1 0 000-1.664z"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                </div>
                <h2 className="text-center mt-2">{review.title}</h2>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default Reviews
