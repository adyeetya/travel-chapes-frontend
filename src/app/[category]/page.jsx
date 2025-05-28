import React from 'react'
import { fetchTripByCategory, fetchAllCategories } from '@/app/fetchTrip'
import CategoryTripsContent from './CategoryTripsContent'

export async function generateMetadata({ params }) {
    const { category } = params;
    // Fetch category details for metadata
    const categories = await fetchAllCategories();
    const categoryObj = categories.find(cat =>
        cat.category && cat.category.toLowerCase().replace(/\s+/g, '-') === category
    );
    return {
        title: `Travel Chapes | ${categoryObj?.name || category}`,
        description: categoryObj?.metaDescription || `Explore the best ${categoryObj?.name || category} trips and packages with Travel Chapes.`,
        keywords: categoryObj?.keywords || `${categoryObj?.name || category}, travel, trips, packages, tours, Travel Chapes`
    };
}

const Page = async ({ params }) => {
    const { category } = params;
    // Fetch all categories to find the original name
    const categories = await fetchAllCategories();
    const categoryObj = categories.find(cat =>
        cat.category && cat.category.toLowerCase().replace(/\s+/g, '-') === category
    );
    const fetchCategory = categoryObj ? categoryObj.category : category;

    // --- Session Storage Cache Check (runs only on client, so fallback to fetch for SSR) ---
    let trips = [];

    // SSR fallback
    console.log(`Fetching trips for category: ${fetchCategory} (SSR)`);
    const tripsData = await fetchTripByCategory(fetchCategory);
    trips = tripsData?.result?.docs || [];


    const heroImage = trips[0]?.banners?.web || trips[0]?.banners?.phone || trips[0]?.images?.[0] || '/images/placeholder.jpg';
    const ageGroups = Array.from(new Set(trips.map(trip => trip.ageGroup).filter(Boolean)));
    return (
        <CategoryTripsContent initialTrips={trips} ageGroups={ageGroups} category={fetchCategory} heroImage={heroImage} />
    );
}

export default Page