import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StageList = () => {
    const [stages, setStages] = useState([]);
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        // Fetch stages and deals when the component mounts
        axios.get('http://localhost:8080/api/stages')
            .then(response => {
                setStages(response.data);
            })
            .catch(error => console.error('Error fetching stages:', error));

        axios.get('http://localhost:8080/api/deals')
            .then(response => {
                setDeals(response.data);
            })
            .catch(error => console.error('Error fetching deals:', error));
    }, []);

    return (
        <div className="kanban-board">
            {stages.map(stage => (
                <div className="kanban-column" key={stage.id}>
                    <h3>{stage.name}</h3>
                    {deals
                        .filter(deal => deal.stage.id === stage.id)
                        .map(deal => (
                            <div className="deal-card" key={deal.id}>
                                <p>{deal.name}</p>
                                <p>Amount: {deal.amount}</p>
                            </div>
                        ))
                    }
                    {deals.filter(deal => deal.stage.id === stage.id).length === 0 && (
                        <p>No deals in this stage</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default StageList;
