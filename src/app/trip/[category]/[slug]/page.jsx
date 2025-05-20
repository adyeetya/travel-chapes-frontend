// app/trips/[slug]/page.js
import { fetchBatch, fetchTripPlan } from "@/app/fetchTrip";
import Content from "./Content";
import ErrorDisplay from "./ErrorDisplay";

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
    return <ErrorDisplay onRetry={() => window.location.reload()} />;
  }
}