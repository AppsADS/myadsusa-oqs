import YesNoSelect from './YesNoSelect';  // Import the correct component
import { useParams } from 'react-router-dom';
import './styles/DealDetail.css'; // Assuming you have a DealDetail.css for styling
import React, { useEffect, useState } from 'react';

const DealDetail = () => {
    const { id } = useParams(); // Get the deal ID from URL
    const [deal, setDeal] = useState(null); // Store the deal data
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch the deal by ID
        const fetchDealById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/deals/${id}`);
                if (response.ok) {
                    const dealData = await response.json();
                    setDeal(dealData);
                } else {
                    console.error('Failed to fetch deal data');
                }
            } catch (error) {
                console.error('Error fetching deal:', error);
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchDealById();
    }, [id]); // Re-run effect when the deal ID changes

    if (loading) {
        return <p>Loading deal data...</p>; // Show loading message while fetching
    }

    if (!deal) {
        return <p>Deal not found</p>; // If no deal is found, show an error message
    }

    return (
        <div className="deal-details-container">
            {/* Left Pane: Deal Summary */}
            <div className="deal-summary">
                <h2>{deal.name}</h2>
                <p>Amount: ${deal.amount.toLocaleString()}</p>
                <p>Stage: {deal.stage.name}</p>
                <p>Stage Description: {deal.stage.description}</p>

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
            </div>

            {/* Center Pane: Focus and History */}
            <div className="deal-focus-history">
                <div className="deal-focus">
                    <h3>Focus</h3>
                    <p>No focus items yet. Scheduled activities, pinned notes, email drafts, and scheduled emails will appear here.</p>
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