'use client';
import { useState, useEffect } from 'react';
import { fetchAllTrips } from '../fetchTrip';
import Link from 'next/link';
export default function AllTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    // Add any default filter params here
  });



  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllTrips(params);
        console.log(data);
        setTrips(data.result.docs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, [params]); // Re-fetch when params change

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded min-h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Trips</h1>
      
      {/* Trip List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.length > 0 ? (
          trips.map(trip => (
            <Link key={trip._id} href={`/trip/${trip.slug}`}>

<div key={trip._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{trip.name}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Category:</span> {trip.category}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Dates:</span> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </p>
              <p className="mb-1">
                <span className="font-medium">Status:</span> 
                <span className={`ml-1 ${trip.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {trip.status}
                </span>
              </p>
            </div>
            </Link>
           
          ))
        ) : (
          <p className="text-gray-500">No trips found</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => setParams(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
          disabled={params.page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {params.page}</span>
        <button
          onClick={() => setParams(prev => ({ ...prev, page: prev.page + 1 }))}
          disabled={trips.length < params.limit}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}