// app/trips/[slug]/page.js
import { fetchBatch, fetchTripPlan } from "@/app/fetchTrip";
import Content from "./Content";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const tripData = await fetchTripPlan(slug);
    const trip = tripData?.result || {};
    
    return {
      title: `${trip.title} | ${trip.name}` || "Trip Details",
      description: trip.metaDescription || trip.shortDescription || `Explore ${trip.title} with our exclusive trip package`,
      openGraph: {
        title: trip.title || "Trip Details",
        description: trip.shortDescription || `Explore ${trip.name}`,
        images: trip.banners?.web ? [trip.banners.web] : [],
        url: `www.travelchapes.com/trips/${slug}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: trip.title || "Trip Details",
        description: trip.shortDescription || `Explore ${trip.title}`,
        images: trip.banners?.web ? [trip.banners.web] : [],
      },
      alternates: {
        canonical: `www.travelchapes.com/trips/${slug}`,
      }
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Trip Details",
      description: "Explore this exciting trip package",
    };
  }
}

export default async function Page({ params }) {
  const { slug } = params;
  
  try {
    // Fetch both trip and batch data in parallel
    const [tripData, batchData] = await Promise.all([
      fetchTripPlan(slug),
      fetchBatch(slug),
    ]);

    const trip = tripData?.result || {};
    const batch = batchData?.result || {};

    return (
      <div>
        <Content destination={trip} batch={batch} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching trip data:", error);
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Error Loading Trip</h1>
          <p>We couldn't load the trip details. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}