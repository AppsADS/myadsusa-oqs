import YesNoSelect from './YesNoSelect';  // Import the correct component
import { useParams } from 'react-router-dom';
import './styles/DealDetail.css'; // Assuming you have a DealDetail.css for styling
import React, { useEffect, useState } from 'react';
import axios from "axios";

const DealDetail = () => {
    const { id } = useParams(); // Get the deal ID from URL
    const [deal, setDeal] = useState(null); // Store the deal data
    const [loading, setLoading] = useState(true); // Loading state
    const [stages, setStages] = useState([]); // To store the stages information
    const [selectedStage, setSelectedStage] = useState(null);

    useEffect(() => {
        // Fetch deal details by ID
        axios.get(`https://myadsusa-oqs.herokuapp.com/api/deals/${id}`)
            .then(response => {
                console.log("Deal Data: ", response.data); // Debugging log
                setDeal(response.data);
                setLoading(false);
                setSelectedStage(response.data.stage.id); // Set the current stage as the selected stage
            })
            .catch(error => console.error('Error fetching deal:', error));
        setLoading(false);

        // Fetch all stages for the dropdown
        axios.get('https://myadsusa-oqs.herokuapp.com/api/stages')
            .then(response => {
                console.log("Stages Data: ", response.data); // Debugging log
                setStages(response.data); // Populate stages
            })
            .catch(error => console.error('Error fetching stages:', error));
    }, [id]);


    const handleStageChange = (event) => {
        setSelectedStage(event.target.value); // Update selected stage
    };

    const updateStage = () => {
        axios.put(`https://myadsusa-oqs.herokuapp.com/api/deals/${id}/stage`, selectedStage, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setDeal(response.data); // Update deal in the UI after stage update
                alert('Stage updated successfully!');
            })
            .catch(error => {
                console.error('Error updating stage:', error);
                alert('Failed to update stage.');
            });
    };




    if (loading) {
        return <p>Loading deal data...</p>; // Show loading message while fetching
    }

    if (!deal) {
        console.log("Deal not found yet, still loading...");
        return <div>Loading deal details...</div>;// If no deal is found, show an error message
    }

    return (
        <div>
            <h2>Deal Details: {deal.name}</h2>
            <p>Amount: ${deal.amount}</p>
            <p>Current Stage: {deal.stage.name}</p>

            <div>
                <label htmlFor="stageSelect">Move to Stage:</label>
                <select
                    id="stageSelect"
                    value={selectedStage}
                    onChange={handleStageChange}
                >
                    {stages.map(stage => (
                        <option key={stage.id} value={stage.id}>
                            {stage.name}
                        </option>
                    ))}
                </select>
                <button onClick={updateStage}>Update Stage</button>
            </div>

            <div className="deal-action-items">
                <h3>Action Items</h3>
                <ul>
                    <li>Order Review Approved: {deal.orderReviewApproved ? 'Yes' : 'No'}</li>
                    <li>Local Order Placeholder: {deal.localOrderPlaceholder || 'Not provided'}</li>
                    <li>Customer Questionnaire Completed: {deal.customerQuestionnaireCompleted ? 'Yes' : 'No'}</li>
                    <li>Schedule Confirmed: {deal.scheduleConfirmed ? 'Yes' : 'No'}</li>
                    <li>Billing Complete: {deal.billingComplete ? 'Yes' : 'No'}</li>
                    <li>Funding Complete: {deal.fundingComplete ? 'Yes' : 'No'}</li>
                    <li>Submitted for Payroll: {deal.submittedForPayroll ? 'Yes' : 'No'}</li>
                    <li>Pending Final Approval: {deal.pendingFinalApproval ? 'Yes' : 'No'}</li>
                    <li>Being Paid: {deal.beingPaid ? 'Yes' : 'No'}</li>
                </ul>
            </div>

            {/* Center Pane: Focus and History */}
            <div className="deal-focus-history">
                <div className="deal-focus">
                    <h3>Focus</h3>
                    <p>No focus items yet. Scheduled activities, pinned notes, email drafts, and scheduled emails will
                        appear here.</p>
                </div>
                <div className="deal-history">
                    <h3>History</h3>
                    <p>No notes added yet. Add notes, emails, or activities to see them here.</p>
                </div>
            </div>
        </div>
    );
};

export default DealDetail;