import React, { useEffect, useState, useContext } from 'react';
import AuthProvider from '../AuthProvider'; // Adjust path if needed
import { ServerUrl } from '../config';
import axios from 'axios';

const page = () => {
  const { user } = useContext(AuthProvider); // Assumes user object has token
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.token) return;
      try {
        const res = await axios.get(`${ServerUrl}/booking/getBookingList`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        setBookings(res.data.data || []); // response shape: { data: bookings }
      } catch (err) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (!user) return <div>Please log in to view your bookings.</div>;
  if (loading) return <div>Loading bookings...</div>;
  if (bookings.length === 0) return <div>No bookings found.</div>;

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            Trip: {booking.tripId?.name || 'N/A'}<br />
            Destination: {booking.tripId?.destination || 'N/A'}<br />
            People: {booking.noOfPeople}<br />
            Price: ₹{booking.price}<br />
            Status: {booking.paymentStatus}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;