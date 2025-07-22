'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users, Locate, IndianRupee, CalendarCheck2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthContext } from '../AuthProvider'
import { ServerUrl } from '../config'
import axios from 'axios'
import Link from 'next/link'
import Cookies from 'js-cookie'
// work on generating receipt
// in the after payment success also geneerate receipt
const Page = () => {
  const { user, authLoading } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const jwt = Cookies.get('jwt');
    if (!jwt) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${ServerUrl}/booking/getBookingList`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Bookings fetched:", res.data);
      setBookings(res.data.result || []);

    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    fetchBookings();
  }, [user]);

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`${ServerUrl}/booking/deleteBooking`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwt')}`,
          'Content-Type': 'application/json',
        },
        data: { bookingId }
      });
      // Refresh bookings after deletion
      fetchBookings();
      alert('Booking deleted successfully');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert(error.response?.data?.responseMessage || 'Failed to delete booking');
    }
  };

  const handleGenerateReceipt = async (bookingId) => {
    try {
      const response = await axios.post(`${ServerUrl}/booking/generateReceipt`, { bookingId }, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwt')}`,
          'Content-Type': 'application/json',
        }
      });
      // Open the receipt URL in a new tab
      window.open(response.data.data.receiptUrl, '_blank');
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert(error.response?.data?.responseMessage || 'Failed to generate receipt');
    }
  };

  const handleMakePayment = async (bookingId) => {
    // Implement your payment flow here
    // This could redirect to a payment gateway
    alert('Redirecting to payment gateway...');
  };

  const handleContactSupport = (bookingId) => {
    // Implement your contact support flow
    window.location.href = `/contact?bookingId=${bookingId}`;
  };

  if (authLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!user) return (
    <div className="min-h-[calc(100vh-3rem)] flex flex-col items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">View Your Bookings</h2>
        <p className="text-gray-600 mb-6">Please log in to access your booking history</p>
        <Link
          href="/auth/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
        >
          Login Now
        </Link>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (bookings.length === 0) return (
    <div className="min-h-[calc(100vh-3rem)] flex flex-col items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">No Bookings Found</h2>
        <p className="text-gray-600 mb-6">You haven&apos;t made any bookings yet</p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
        >
          Browse Trips
        </Link>
      </div>
    </div>
  );

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Your Bookings</h1>
          <p className="text-gray-500">Manage your upcoming and past trips</p>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center p-8">
            <CardHeader>
              <CardTitle className="text-gray-700">No bookings yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">You haven&apos;t made any bookings yet</p>
              <Button asChild>
                <Link href="/">Browse Trips</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <Card key={booking._id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{booking.tripId?.slug || 'Unnamed Trip'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Locate className="h-5 w-5 text-blue-500" />
                      <span>{booking.tripId?.locationId?.city || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-blue-500" />
                      <span>
                        {formatDate(booking.tripId?.startDate)} - {formatDate(booking.tripId?.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-500" />
                      <span>
                        {booking.noOfPeople} {booking.noOfPeople === 1 ? 'person' : 'people'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <IndianRupee className="h-5 w-5 text-blue-500" />
                      <span>{booking.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarCheck2 className="h-5 w-5 text-blue-500" />
                      <span>Booked on {formatDate(booking.createdAt)}</span>
                    </div>
                  </div>

                  <Badge
                    variant={
                      booking.paymentStatus === 'paid' ? 'success' :
                        booking.paymentStatus === 'pending' ? 'warning' : 'destructive'
                    }
                    className="w-fit"
                  >
                    {booking.paymentStatus}
                  </Badge>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  {booking.paymentStatus === 'paid' || booking.paymentStatus === 'completed' ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleGenerateReceipt(booking._id)}
                        className="flex-1"
                      >
                        Receipt
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="flex-1"
                      >
                        <a href="tel:+918851629108"> {/* Replace with your support number */}
                          Support
                        </a>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleMakePayment(booking._id)}
                        className="flex-1"
                      >
                        Pay Now
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;