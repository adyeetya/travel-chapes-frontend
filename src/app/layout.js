import localFont from 'next/font/local'
import './globals.css'
import { Poppins } from 'next/font/google'
const poppins = Poppins({ weight: '400', subsets: ['latin'] })
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import TripModalWrapper from '@/components/modal/ModalWrapper'
export const metadata = {
  title: 'Travel Chapes',
  description: 'The number 1 travel guide',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`'min-h-screen max-w-[100vw] overflow-x-hidden font-sans antialiased scroll-smooth ' ${poppins.className}`}
      >
        <Navbar />
        {children}
        <Footer />
        {/* <TripModalWrapper /> */}
      </body>
    </html>
  )
}
