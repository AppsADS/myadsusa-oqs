import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles/DealPage.css';  // Assuming CSS will be in a separate file

const DealPage = ({ match }) => {
    const [deal, setDeal] = useState(null);  // Start with null to check loading state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dealId = match.params.id;

    useEffect(() => {
        // Fetch deal data
        axios.get(`http://localhost:8080/api/deals/${dealId}`)
            .then(response => {
                setDeal(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching deal:', error);
                setError('Failed to fetch deal. Please try again later.');
                setLoading(false);
            });
    }, [dealId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!deal) {
        return <p>Deal not found.</p>;
    }

    return (
        <div className="deal-page">
            {/* Left Pane */}
            <div className="left-pane">
                <div className="summary-section">
                    <h2>Summary</h2>
                    <p>Amount: {deal.amount || '$0'}</p>
                    <p>Stage: {deal.stage ? deal.stage.name : 'N/A'}</p>
                </div>
                <div className="details-section">
                    <h3>Details</h3>
                    {/* Display any other deal properties as needed */}
                    <p>Deal Name: {deal.name || 'N/A'}</p>
                    <p>Stage Description: {deal.stage ? deal.stage.description : 'N/A'}</p>
                </div>
            </div>

            {/* Center Area */}
            <div className="center-area">
                <div className="focus-section">
                    <h3>Focus</h3>
                    <p>No focus items yet</p>
                </div>
                <div className="history-section">
                    <h3>History</h3>
                    {/* Placeholder for history, assuming it is part of the deal */}
                    <p>No history available</p>
                </div>
            </div>
        </div>
    );
};

export default DealPage;
