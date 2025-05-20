"use client";

export default function ErrorDisplay({ onRetry }) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">Error Loading Trip</h1>
        <p>We couldn&apos;t load the trip details. Please try again later.</p>
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
}