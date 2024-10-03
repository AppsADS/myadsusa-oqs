import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/DealPage.css';  // Ensure you have imported the CSS


const DealPage = ({ match }) => {
    const [deal, setDeal] = useState({});
    const dealId = match.params.id;


    useEffect(() => {
        // Fetch deal data
        axios.get(`http://localhost:8080/api/deals/${dealId}`)
            .then(response => {
                setDeal(response.data);
            })
            .catch(error => console.error('Error fetching deal:', error));
    }, [dealId]);

// Add more fields in your deal mock for testing the layout
    const dealMock = {
        amount: 45000,
        stage: "Scheduled Confirmed",
        history: [
            {date: "10/02/2024", activity: "Deal created."},
            {date: "10/03/2024", activity: "Scheduled confirmed by client."}
        ],
        focus: [
            {task: "Follow up with the client regarding installation."},
            {task: "Ensure billing information is correct."}
        ]
    };

// Use the mock data to fill sections
    return (
        <div className="deal-page">
            <div className="left-pane">
                <div className="summary-section">
                    <h2>Summary</h2>
                    <p>Amount: {dealMock.amount}</p>
                    <p>Stage: {dealMock.stage}</p>
                </div>

                <div className="details-section">
                    <h3>Details</h3>
                    {/* Placeholder details */}
                    <p>Decision Maker: John Doe</p>
                    <p>Contact Type: Primary</p>
                    <p>Notes: Urgent installation required.</p>
                </div>
            </div>

            <div className="center-area">
                <div className="focus-section">
                    <h3>Focus</h3>
                    {dealMock.focus.map((item, index) => (
                        <p key={index}>{item.task}</p>
                    ))}
                </div>

                <div className="history-section">
                    <h3>History</h3>
                    {dealMock.history.map((item, index) => (
                        <p key={index}>{item.date}: {item.activity}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DealPage;
