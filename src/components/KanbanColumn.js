import React from 'react';
import DealCard from './DealCard'; // Import the DealCard component

const KanbanColumn = ({ stage, deals, moveDeal }) => {
    return (
        <div className="kanban-column">
            <h2>{stage.name}</h2>
            <div className="deal-list">
                {deals.length === 0 ? (
                    <p>No deals in this stage</p>
                ) : (
                    deals.map((deal) => (
                        <DealCard
                            key={deal.id}
                            deal={deal}
                            moveDeal={moveDeal}
                            currentStageId={stage.id}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default KanbanColumn;
