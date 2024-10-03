import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DealCard from './DealCard';

const StageColumn = ({ stage, deals }) => {
    return (
        <Droppable droppableId={String(stage.id)}>
            {(provided) => (
                <div
                    className="stage-column"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    <h2>{stage.name}</h2>
                    {deals.map((deal, index) => (
                        <DealCard key={deal.id} deal={deal} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default StageColumn;
