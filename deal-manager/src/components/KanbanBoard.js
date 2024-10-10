import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'DEAL';

function DealCard({ deal, moveDeal }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { dealId: deal.id },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                moveDeal(item.dealId, dropResult.stageId);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className="kanban-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
            <h3>{deal.name}</h3>
            <p>Amount: ${deal.amount}</p>
        </div>
    );
}

function KanbanColumn({ stage, deals, moveDeal }) {
    const [, drop] = useDrop({
        accept: ItemType,
        drop: () => ({ stageId: stage.id }),
    });

    return (
        <div ref={drop} className="kanban-column">
            <h2>{stage.name}</h2>
            <div className="kanban-cards">
                {deals.map(deal => (
                    <DealCard key={deal.id} deal={deal} moveDeal={moveDeal} />
                ))}
            </div>
        </div>
    );
}

function KanbanBoard() {
    const [stages, setStages] = useState([]);
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        axios.get('https://myadsusa-oqs.ue.r.appspot.com/api/stages')
            .then(response => setStages(response.data))
            .catch(error => console.error(error));

        axios.get('https://myadsusa-oqs.ue.r.appspot.com/api/deals')
            .then(response => setDeals(response.data))
            .catch(error => console.error(error));
    }, []);

    const getDealsByStage = (stageId) => deals.filter(deal => deal.stage.id === stageId);

    const moveDeal = (dealId, newStageId) => {
        const deal = deals.find(d => d.id === dealId);
        if (deal) {
            // Update the deal's stage
            axios.put(`https://myadsusa-oqs.ue.r.appspot.com/api/deals/${dealId}`, { ...deal, stage: { id: newStageId } })
                .then(response => {
                    // Update the frontend state
                    setDeals(deals.map(d => d.id === dealId ? { ...d, stage: { id: newStageId } } : d));
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-board">
                {stages.map(stage => (
                    <KanbanColumn
                        key={stage.id}
                        stage={stage}
                        deals={getDealsByStage(stage.id)}
                        moveDeal={moveDeal}
                    />
                ))}
            </div>
        </DndProvider>
    );
}

export default KanbanBoard;
