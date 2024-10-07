import React, { useState } from 'react';
import axios from 'axios';

const DealCard = ({ deal }) => {
    const [selectedStage, setSelectedStage] = useState(deal.stage.id);

    const updateDealStage = async (newStageId) => {
        const updatedDeal = { ...deal, stage: { id: newStageId } };

        // Optimistically update UI
        setSelectedStage(newStageId);

        // Send the PUT request to update on backend
        try {
            await axios.put(`https://myadsusa-oqs-back.herokuapp.com/api/deals/${deal.id}`, updatedDeal);
            alert('Stage updated successfully!');
        } catch (error) {
            console.error('Failed to update the deal stage', error);
            alert('Failed to update deal stage');
        }
    };

    return (
        <div className="deal-card">
            <h3>{deal.name}</h3>
            <p>Amount: ${deal.amount}</p>
            <select
                value={selectedStage}
                onChange={(e) => updateDealStage(e.target.value)}
            >
                <option value="1">Order Review</option>
                <option value="2">Order Approved</option>
                <option value="3">Scheduled Confirmed</option>
                <option value="3">Delivery and Install Complete</option>
                <option value="3">Being Paid</option>
                {/* Add other stages here */}
            </select>
        </div>
    );
};

export default DealCard;