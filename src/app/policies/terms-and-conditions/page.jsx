import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-blue-50 min-h-screen py-12 px-6 md:px-20 text-blue-900">
      <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">
        By using our website and services, you agree to be bound by these Terms and Conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Booking Policy</h2>
      <p className="mb-4">
        All trip bookings are subject to availability and confirmation. Prices are subject to change without notice.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">User Obligations</h2>
      <p className="mb-4">
        You agree to provide accurate information and not misuse our services or engage in unlawful activities.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Liability</h2>
      <p className="mb-4">
        We are not liable for delays, cancellations, or changes caused by third parties, weather, or force majeure.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Jurisdiction</h2>
      <p className="mb-4">
        These terms are governed by the laws of India. Any disputes will be resolved under the jurisdiction of Noida courts.
      </p>
    </div>
  );
};

export default TermsAndConditions;
