import React, { useEffect, useState } from 'react';
import api from '../services/api';

const DealList = () => {
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        try {
            const response = await api.get('http://localhost:8080/api/deals');
            setDeals(response.data);
        } catch (error) {
            console.error("Error fetching deals:", error);
        }
    };


    return (
        <div className="container">
            <h2>Deals</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Stage</th>
                </tr>
                </thead>
                <tbody>
                {deals.map(deal => (
                    <tr key={deal.id}>
                        <td>{deal.id}</td>
                        <td>{deal.name}</td>
                        <td>{deal.amount}</td>
                        <td>{deal.stage ? deal.stage.name : "N/A"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DealList;
