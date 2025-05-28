"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";

const CategoryTripsContent = ({ initialTrips, ageGroups, category, heroImage }) => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    const [trips, setTrips] = useState(initialTrips);
    const [hydrated, setHydrated] = useState(false);

    // Ensure client and server render match: only run filtering after hydration
    useEffect(() => {
        setHydrated(true);
    }, []);
    const makeUrlFriendly = (category) => {
        return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'));
    };

    useEffect(() => {
        if (!hydrated) return; // Only filter after hydration
        let filtered = [...initialTrips];
        if (search) {
            const s = search.toLowerCase();
            filtered = filtered.filter(
                (trip) =>
                    (trip.slug && trip.slug.toLowerCase().includes(s)) ||
                    (trip.city && trip.city.toLowerCase().includes(s))
            );
        }

        if (sort === "price-asc") {
            filtered = filtered.sort((a, b) => (a.minPrice || 0) - (b.minPrice || 0));
        } else if (sort === "price-desc") {
            filtered = filtered.sort((a, b) => (b.minPrice || 0) - (a.minPrice || 0));
        }
        setTrips(filtered);
    }, [search, sort, initialTrips, hydrated]);

    // Category descriptions (case-insensitive, ignore spaces/hyphens)
    const categoryDescriptions = {
        backpacking: "Embark on unforgettable backpacking adventures, perfect for explorers who crave authentic experiences and offbeat destinations.",
        weekendtrip: "Short on time? Our weekend trips are designed for quick getaways packed with fun, relaxation, and discovery.",
        bikingtrip: "Feel the thrill of the open road with our biking trips, crafted for those who love to ride and explore scenic routes.",
        treks: "Challenge yourself with our curated treks, from easy trails to high-altitude expeditions for every level of trekker.",
        international: "Discover the world beyond borders with our international trips, offering unique cultures, cuisines, and landscapes.",
        spitivalley: "Experience the raw beauty of Spiti Valley—ancient monasteries, dramatic landscapes, and a true Himalayan adventure.",
        ladakh: "Journey to Ladakh, the land of high passes, where stark mountains meet vibrant culture and endless adventure awaits.",
        vietnam: "Unveil the magic of Vietnam—lush landscapes, rich history, and mouthwatering cuisine in every corner.",
        thailand: "From tropical beaches to bustling cities, Thailand offers a perfect blend of relaxation, adventure, and culture.",
        himachalpradesh: "Explore Himachal Pradesh’s charming towns, majestic mountains, and serene valleys for a perfect Himalayan escape.",
        andaman: "Dive into the turquoise waters and pristine beaches of the Andaman Islands—paradise for nature and adventure lovers.",
        goa: "Soak up the sun, sand, and vibrant nightlife in Goa, India’s favorite destination for fun and relaxation.",
        uttrakhand: "Discover Uttarakhand’s spiritual aura, scenic beauty, and adventure—from the Himalayas to holy rivers."
    };

    // Helper to normalize category string
    function normalizeCategory(str) {
        return (str || "").toLowerCase().replace(/\s|-/g, "");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
            {/* Hero Section */}
            <div className="relative w-full h-72 md:h-96 flex flex-col items-center justify-center mb-10">
                <img src={heroImage} alt="Category Hero" className="absolute inset-0 w-full h-full object-cover brightness-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/80 to-transparent" />
                <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-white drop-shadow-lg text-center">
                    {category.charAt(0).toUpperCase() + category.slice(1)} Trips
                </h1>
                {/* Category Description */}
                <p className="relative z-10 mt-4 text-lg md:text-xl text-white/90 max-w-2xl text-center drop-shadow">
                    {categoryDescriptions[normalizeCategory(category)] || "Discover amazing trips and adventures with us!"}
                </p>
            </div>
            {/* Filters */}
            <form
                className="max-w-7xl mx-auto px-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-yellow-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-yellow-600"
                />
                <select
                    name="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border border-yellow-300 rounded-lg px-4 py-2"
                >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>

            </form>
            {/* Trips Grid */}
            <div className="max-w-7xl mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {trips.map((trip) => (
                    <Link
                        key={trip._id}
                        href={`/trip/${Array.isArray(trip.category)
                            ? trip.category.map(makeUrlFriendly).join('&')
                            : makeUrlFriendly(trip.category)}/${trip.slug}`}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.03] transition-transform border border-yellow-100"
                    >
                        <div className="relative h-48 w-full">
                            <img
                                src={trip.banners?.web || trip.banners?.phone || trip.images?.[0]}
                                alt={trip.title}
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 bg-yellow-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                                {Array.isArray(trip.category) ? trip.category.join(', ') : trip.category}
                            </span>
                        </div>
                        <div className="flex-1 flex flex-col p-4">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{trip.title}</h2>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                {trip.description.replace(/<[^>]*>/g, '')}
                            </p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-yellow-600 font-bold text-xl">₹{trip.minPrice}</span>
                                <span className="text-xs text-gray-500">{trip.ageGroup} yrs</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {hydrated && trips.length === 0 && (
                <div className="text-center text-gray-500 py-20 text-xl">No trips found for this category.</div>
            )}
        </div>
    );
};

export default CategoryTripsContent;
