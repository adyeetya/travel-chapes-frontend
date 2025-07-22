import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="bg-blue-50 min-h-screen py-12 px-6 md:px-20 text-blue-900">
      <h1 className="text-4xl font-bold mb-6">Cancellation and Refund Policy</h1>
      <p className="mb-4">
        Our goal is to offer the best travel experience. Please review our cancellation and refund terms below.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Cancellation by the Customer</h2>
      <p className="mb-4">
        - Cancellations 30 days or more before departure: 90% refund<br />
        - Cancellations between 15–29 days: 50% refund<br />
        - Cancellations within 14 days: No refund
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Cancellation by Us</h2>
      <p className="mb-4">
        If we cancel a trip due to unforeseen reasons, you will receive a full refund or the option to rebook another date.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Cancellation Due to Government Orders, Natural Disasters, or Weather Conditions
      </h2>
      <p className="mb-4">
        In the event of government restrictions, natural disasters, pandemics, or severe weather conditions, we reserve the right to cancel, reschedule, or modify the trip. In such cases:
        <br />
        - We will attempt to offer a rescheduled date or alternative trip.<br />
        - If rescheduling is not possible, a partial refund (after deducting unrecoverable costs like permits, accommodations, etc.) may be offered.<br />
        - Refund eligibility in these cases will be evaluated on a case-by-case basis.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Refund Process</h2>
      <p className="mb-4">
        Refunds will be processed within 7–10 business days to the original payment method.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">No-Show Policy</h2>
      <p className="mb-4">
        No refund will be issued for no-shows or unused services.
      </p>
    </div>
  );
};

export default RefundPolicy;
