'use client'

import { useEffect, useState } from 'react'
import TripModal from './TripModal'

export default function TripModalWrapper() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Trigger modal after 10 seconds
    const timer = setTimeout(() => setShowModal(true), 10000)

    return () => clearTimeout(timer) // Clean up the timeout
  }, [])

  const handleClose = () => {
    setShowModal(false)
  }

  return <>{showModal && <TripModal onClose={handleClose} />}</>
}
