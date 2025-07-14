'use client';
import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isSameMonth, isWithinInterval, addMonths, parseISO, compareAsc } from 'date-fns';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth } from '@/app/auth/AuthLogic';
import LoginSignupModal from './LoginSignupModal';
import { ServerUrl } from '@/app/config';

const BookingModal = ({ destination, batches, onClose }) => {

  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedOccupancy, setSelectedOccupancy] = useState('double');
  const [vehicleCounts, setVehicleCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [filterType, setFilterType] = useState('thisMonth');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortType, setSortType] = useState('date');
  const [bookingId, setBookingId] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPayNow, setShowPayNow] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [razorpayOrder, setRazorpayOrder] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState('');
  const confettiRef = useRef(null);
  const auth = useAuth();

  // Get available occupancy types based on pricing
  const getAvailableOccupancyTypes = () => {
    if (!selectedBatch) return [];

    const types = [];
    const sampleVehicle = Object.keys(selectedBatch.pricing)[0];
    const pricing = selectedBatch.pricing[sampleVehicle];

    if (pricing.single > 0) types.push('single');
    if (pricing.double > 0) types.push('double');
    if (pricing.triple > 0) types.push('triple');

    return types;
  };

  // Initialize vehicle counts when batch is selected
  useEffect(() => {
    if (selectedBatch) {
      const initialCounts = {};
      Object.keys(selectedBatch.pricing).forEach(vehicle => {
        initialCounts[vehicle] = 0;
      });
      setVehicleCounts(initialCounts);
    }
  }, [selectedBatch]);

  // Calculate total price whenever selections change
  useEffect(() => {
    if (selectedBatch && selectedOccupancy) {
      let calculatedTotal = 0;

      Object.entries(vehicleCounts).forEach(([vehicle, count]) => {
        if (count > 0) {
          const price = selectedBatch.pricing[vehicle][selectedOccupancy];
          calculatedTotal += price * count;
        }
      });

      // Add GST
      const gstAmount = calculatedTotal * (selectedBatch.gst / 100);
      setTotalPrice(calculatedTotal + gstAmount);
    }
  }, [vehicleCounts, selectedOccupancy, selectedBatch]);

  // Filtering logic
  const now = new Date();
  let filteredBatches = batches;

  if (filterType === 'thisMonth') {
    filteredBatches = batches.filter(batch =>
      isSameMonth(parseISO(batch.startDate), now)
    );
  } else if (filterType === 'nextMonth') {
    const nextMonth = addMonths(now, 1);
    filteredBatches = batches.filter(batch =>
      isSameMonth(parseISO(batch.startDate), nextMonth)
    );
  } else if (filterType === 'all') {
    filteredBatches = batches;
  }

  // Sorting logic
  if (sortType === 'date') {
    filteredBatches = [...filteredBatches].sort((a, b) => compareAsc(parseISO(a.startDate), parseISO(b.startDate)));
  } else if (sortType === 'price') {
    filteredBatches = [...filteredBatches].sort((a, b) => {
      const minA = Math.min(...Object.values(a.pricing).map(p => Math.min(p.single || Infinity, p.double || Infinity, p.triple || Infinity)));
      const minB = Math.min(...Object.values(b.pricing).map(p => Math.min(p.single || Infinity, p.double || Infinity, p.triple || Infinity)));
      return minA - minB;
    });
  }

  const handleVehicleCountChange = (vehicle, change) => {
    setVehicleCounts(prev => ({
      ...prev,
      [vehicle]: Math.max(0, (prev[vehicle] || 0) + change)
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(price));
  };
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true); // Already loaded

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Remove Book Now button and use only Pay Now
  // Add proper checks before initiating booking/payment
  const handlePayNow = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || typeof window.Razorpay !== 'function') {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }


    // Check authentication
    const jwt = Cookies.get('jwt');
    if (!jwt) {
      setShowLoginModal(true);
      return;
    }
    // Validation checks
    if (!selectedBatch) {
      alert('Please select a batch.');
      return;
    }
    const noOfPeople = Object.values(vehicleCounts).reduce((a, b) => a + b, 0);
    if (noOfPeople < 1) {
      alert('Please select at least one person.');
      return;
    }
    if (!totalPrice || totalPrice <= 0) {
      alert('Price must be greater than zero.');
      return;
    }
    // Prepare booking data
    const bookingData = {
      tripId: selectedBatch._id,
      noOfPeople,
      price: totalPrice,
    };
    try {
      // Create booking
      const res = await axios.post(`${ServerUrl}/booking/createBooking`, bookingData, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setBookingId(res.data.result._id);
      // Initiate payment
      const payRes = await axios.post(`${ServerUrl}/payment/createOrder`, {
        tripId: selectedBatch._id,
        amount: totalPrice,
        bookingId: res.data.result._id,
      }, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log('Payment order created:', payRes?.data?.result?.order);
      setRazorpayOrder(payRes?.data?.result?.order);
      const order = payRes?.data?.result?.order;
      // Open Razorpay checkout
      const options = {
        key: 'rzp_test_HTcXLxTOzRn3DB',
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: async function (response) {
          // Verify payment
          try {
            const verifyRes = await axios.post(`${ServerUrl}/payment/verifyPayment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }, {
              headers: { Authorization: `Bearer ${jwt}` },
            });
            setPaymentStatus(verifyRes.data.status);
            if (verifyRes.data.status === 'success') {
              setShowSuccessModal(true);
              setInvoiceUrl(verifyRes.data?.paymentDetails?.invoiceUrl || '');
              // Optionally trigger confetti animation here
            } else {
              alert('Payment failed!');
            }
          } catch (err) {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: auth.user?.name || '',
          email: auth.user?.email || '',
          contact: auth.user?.number || '',
        },
        theme: { color: '#3399cc' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Booking or payment failed:', err);
      alert(err.response?.data?.responseMessage || 'Booking or payment failed');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white text-black rounded-lg shadow-lg relative flex flex-col mt-12" style={{ width: '90vw', height: '90vh' }}>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={32} />
        </button>
        <div className="p-6 overflow-y-auto h-full">
          {/* Trip Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/3">
              <img
                src={destination?.banners?.web}
                alt={destination?.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-2 text-black">{destination?.title}</h2>
              <p className="text-gray-600 mb-2">{destination?.route}</p>
              <p className="text-gray-700 mb-4">{destination?.fullItinerary?.length || 9} Days / {destination?.fullItinerary?.length - 1 || 8} Nights</p>
              <div
                className="prose prose-sm"
                dangerouslySetInnerHTML={{ __html: destination?.description.substring(0, 300) + '...' }}
              />
            </div>
          </div>

          <div className='flex justify-between items-center mb-6'>
            {/* Batch Filters as Buttons */}
            <div className=" flex gap-2 items-center">
              <span className="font-medium">Show:</span>
              <Button
                variant={filterType === 'thisMonth' ? 'default' : 'outline'}
                onClick={() => setFilterType('thisMonth')}
              >
                This Month
              </Button>
              <Button
                variant={filterType === 'nextMonth' ? 'default' : 'outline'}
                onClick={() => setFilterType('nextMonth')}
              >
                Next Month
              </Button>
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
            </div>

            {/* Batch Sort Dropdown */}
            <div className=" flex gap-2 items-center">
              <label className="font-medium">Sort:</label>
              <select value={sortType} onChange={e => setSortType(e.target.value)} className="border rounded px-2 py-1">
                <option value="date">By Date</option>
                <option value="price">By Price</option>
              </select>
            </div>
          </div>

          {/* Batch Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Select Your Travel Dates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBatches.map(batch => (
                <Card
                  key={batch._id}
                  className={`cursor-pointer ${selectedBatch?._id === batch._id ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setSelectedBatch(batch)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {format(new Date(batch.startDate), 'dd MMM')} - {format(new Date(batch.endDate), 'dd MMM yyyy')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Available
                    </Badge>
                    <p className="text-sm mt-2">
                      From ₹{Math.min(
                        batch.pricing.bus?.single > 0 ? batch.pricing.bus.single : batch.pricing.bus.double,
                        batch.pricing.bus?.double,
                        batch.pricing.bus?.triple
                      )}/person
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {selectedBatch && (
            <>
              {/* Occupancy Selection */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Select Occupancy Type</h3>
                <div className="flex gap-4">
                  {getAvailableOccupancyTypes().map(occupancy => (
                    <Button
                      key={occupancy}
                      variant={selectedOccupancy === occupancy ? 'default' : 'outline'}
                      onClick={() => setSelectedOccupancy(occupancy)}
                    >
                      {occupancy.charAt(0).toUpperCase() + occupancy.slice(1)} Occupancy
                    </Button>
                  ))}
                </div>
              </div>

              {/* Vehicle Selection */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Select Vehicles</h3>
                <div className="space-y-4">
                  {Object.entries(selectedBatch.pricing).map(([vehicle, pricing]) => (
                    <Card key={vehicle}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium uppercase">{vehicle}</h4>
                            <p className="text-sm text-gray-600">
                              ₹{formatPrice(pricing[selectedOccupancy])} per person
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleVehicleCountChange(vehicle, -1)}
                              disabled={!vehicleCounts[vehicle] || vehicleCounts[vehicle] <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {vehicleCounts[vehicle] || 0}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleVehicleCountChange(vehicle, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <Card className="sticky bottom-0 bg-white border-t">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600">Total Amount</div>
                      <div className="text-2xl font-bold">₹{formatPrice(totalPrice)}</div>
                      <div className="text-xs text-gray-500">incl. {selectedBatch.gst}% GST</div>
                    </div>
                    <Button
                      onClick={handlePayNow}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Pay Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
      {showLoginModal && (
        <LoginSignupModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => setShowLoginModal(false)}
        />
      )}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <span style={{fontSize: '3rem'}}>🎉</span>
            <h2 className="text-2xl font-bold mt-2 mb-4 text-green-700">Payment Successful!</h2>
            <p className="mb-4">Thank you for your booking. Your payment was processed successfully.</p>
            {invoiceUrl ? (
              <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700 mb-2">Download Invoice</Button>
              </a>
            ) : (
              <Button disabled className="mb-2">Invoice not available</Button>
            )}
            <Button onClick={() => setShowSuccessModal(false)} className="bg-gray-400 hover:bg-gray-500">Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModal;