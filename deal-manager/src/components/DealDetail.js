import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DealDetail = () => {
    const { id } = useParams(); // Get deal ID from the URL
    const [deal, setDeal] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch the deal data by ID
        fetchDealById(id)
            .then((dealData) => {
                setDeal(dealData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Fetch error: ", error);
                setError(`Failed to load deal data: ${error.message}`);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!deal) {
        return <div>No deal found.</div>;
    }

    return (
        <div className="deal-detail">
            <h2>{deal.name}</h2>
            <p>Amount: {deal.amount}</p>
            <p>Stage: {deal.stage?.name || 'No stage info'}</p>
            {/* You can display more details if needed */}
        </div>
    );
};

// Function to fetch deal data by ID
const fetchDealById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/deals/${id}`);

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export default DealDetail;
