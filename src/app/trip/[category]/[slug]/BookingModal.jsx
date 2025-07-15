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
import SuccessModal from './SuccessModal';
import TripHeader from './TripHeader';
import BatchFilters from './BatchFilters';
import BatchSelection from './BatchSelection';
import OccupancySelection from './OccupancySelection';
import VehicleSelection from './VehicleSelection';
import PriceSummary from './PriceSummary';
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
  const [isProcessing, setIsProcessing] = useState(false);

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
    setIsProcessing(true);
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || typeof window.Razorpay !== 'function') {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      setIsProcessing(false);
      return;
    }


    // Check authentication
    const jwt = Cookies.get('jwt');
    if (!jwt) {
      setShowLoginModal(true);
      setIsProcessing(false);
      return;
    }
    // Validation checks
    if (!selectedBatch) {
      alert('Please select a batch.');
      setIsProcessing(false);
      return;
    }
    const noOfPeople = Object.values(vehicleCounts).reduce((a, b) => a + b, 0);
    if (noOfPeople < 1) {
      alert('Please select at least one person.');
      setIsProcessing(false);
      return;
    }
    if (!totalPrice || totalPrice <= 0) {
      alert('Price must be greater than zero.');
      setIsProcessing(false);
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
          setIsProcessing(false);
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
      setIsProcessing(false);
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
          <TripHeader destination={destination} />

          <BatchFilters
            filterType={filterType}
            setFilterType={setFilterType}
            sortType={sortType}
            setSortType={setSortType}
          />

          <BatchSelection
            filteredBatches={filteredBatches}
            selectedBatch={selectedBatch}
            setSelectedBatch={setSelectedBatch}
          />

          {selectedBatch && (
            <>
              <OccupancySelection
                availableTypes={getAvailableOccupancyTypes()}
                selectedOccupancy={selectedOccupancy}
                setSelectedOccupancy={setSelectedOccupancy}
              />

              <VehicleSelection
                selectedBatch={selectedBatch}
                selectedOccupancy={selectedOccupancy}
                vehicleCounts={vehicleCounts}
                handleVehicleCountChange={handleVehicleCountChange}
                formatPrice={formatPrice}
              />

              <PriceSummary
                totalPrice={totalPrice}
                selectedBatch={selectedBatch}
                formatPrice={formatPrice}
                handlePayNow={handlePayNow}
                isProcessing={isProcessing}
              />
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
        <SuccessModal invoiceUrl={invoiceUrl} setShowSuccessModal={setShowSuccessModal} />
      )}
    </div>
  );
};

export default BookingModal;