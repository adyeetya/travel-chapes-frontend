'use client';
import { fetchTripPlan, fetchTripByCategory } from '@/app/fetchTrip';
import React, { useEffect, use, useState } from 'react'
import Content from './Content'
const page = ({ params }) => {
    const { slug } = use(params)
    const [trip, setTrip] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTrip = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchTripPlan(slug);
                // console.log(data);
                setTrip(data.result || {});
                // console.log(data.result)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        // const loadByCategory = async (category) => {
        //     setLoading(true);
        //     setError(null);
        //     try {
        //         const data = await fetchTripByCategory(category);
        //         // console.log(data);
                
        //         console.log('cateogry: ',data.result.docs)
        //     }
        //     catch (err) {
        //         setError(err.message);
        //     }
        //     finally {
        //         setLoading(false);
        //     }
        // }


        loadTrip();
        // loadByCategory('Weekend Gateway');
    }
        , [slug])


    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded min-h-screen">
                Error: {error}
            </div>
        );
    }
    return (
        <div>
            <Content destination={trip} />
        </div>
    )
}

export default page