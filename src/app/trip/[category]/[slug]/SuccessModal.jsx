import React from 'react';
import { Button } from '@/components/ui/button';

const SuccessModal = ({ invoiceUrl, setShowSuccessModal }) => (
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
);

export default SuccessModal;
