import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DealList = () => {
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        // Fetch deals when the component mounts
        axios.get('http://localhost:8080/api/deals')
            .then(response => {
                setDeals(response.data);
            })
            .catch(error => console.error('Error fetching deals:', error));
    }, []);

    return (
        <div className="kanban-board">
            {deals.length > 0 ? deals.map(deal => (
                <div className="deal-card" key={deal.id}>
                    <p>{deal.name}</p>
                    <p>Amount: {deal.amount}</p>
                </div>
            )) : (
                <p>No deals available</p>
            )}
        </div>
    );
};

export default DealList;
