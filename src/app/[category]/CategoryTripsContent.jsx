"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";

const CategoryTripsContent = ({ initialTrips, ageGroups, category, heroImage }) => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [trips, setTrips] = useState(initialTrips);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const makeUrlFriendly = (category) => {
        return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'));
    };

    useEffect(() => {
        if (!hydrated) return;
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

    const categoryDescriptions = {
        // ... (keep your existing category descriptions)
    };

    function normalizeCategory(str) {
        return (str || "").toLowerCase().replace(/\s|-/g, "");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
            {/* Hero Section - Made slightly shorter on mobile */}
            <div className="relative w-full h-60 md:h-96 flex flex-col items-center justify-center mb-6 md:mb-10">
                <img 
                    src={heroImage} 
                    alt="Category Hero" 
                    className="absolute inset-0 w-full h-full object-cover brightness-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/80 to-transparent" />
                <h1 className="relative z-10 text-3xl md:text-6xl font-bold text-white drop-shadow-lg text-center px-4">
                    {category.charAt(0).toUpperCase() + category.slice(1)} Trips
                </h1>
                <p className="relative z-10 mt-3 text-sm md:text-xl text-white/90 max-w-2xl text-center px-4 drop-shadow">
                    {categoryDescriptions[normalizeCategory(category)] || "Discover amazing trips and adventures with us!"}
                </p>
            </div>

            {/* Filters - Stacked vertically on mobile */}
            <div className="max-w-7xl mx-auto px-4 mb-6 sticky top-0 bg-yellow-50/90 backdrop-blur-sm py-3 z-10 border-b border-yellow-200">
                <form className="flex flex-col md:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Search trips..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-yellow-300 rounded-lg px-4 py-2 w-full focus:outline-yellow-600"
                    />
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border border-yellow-300 rounded-lg px-4 py-2 text-sm md:text-base"
                    >
                        <option value="">Sort By</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </form>
            </div>

            {/* Trips Grid - 2 columns on mobile */}
            <div className="max-w-7xl mx-auto px-4 pb-10">
                {hydrated && trips.length === 0 ? (
                    <div className="text-center text-gray-500 py-20 text-xl">
                        No trips found matching your search.
                    </div>
                ) : (
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {trips.map((trip) => (
                            <Link
                                key={trip._id}
                                href={`/trip/${Array.isArray(trip.category)
                                    ? trip.category.map(makeUrlFriendly).join('&')
                                    : makeUrlFriendly(trip.category)}/${trip.slug}`}
                                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:scale-[1.02] transition-transform border border-yellow-100"
                            >
                                <div className="relative aspect-square w-full">
                                    <img
                                        src={trip.banners?.web || trip.banners?.phone || trip.images?.[0]}
                                        alt={trip.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <span className="absolute top-2 left-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow line-clamp-1 max-w-[80%]">
                                        {Array.isArray(trip.category) ? trip.category.join(', ') : trip.category}
                                    </span>
                                </div>
                                <div className="flex-1 flex flex-col p-3">
                                    <h2 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{trip.title}</h2>
                                    <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                                        {trip.description.replace(/<[^>]*>/g, '')}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-yellow-600 font-bold text-sm md:text-base">₹{trip.minPrice}</span>
                                        <span className="text-xs text-gray-500">{trip.ageGroup} yrs</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryTripsContent;