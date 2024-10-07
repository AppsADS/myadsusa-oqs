import React, { useEffect, useState } from 'react';
import StageColumn from './StageColumn';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';

const Board = () => {
    const [stages, setStages] = useState([]);
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        // Fetch stages and deals from the API
        const fetchStages = async () => {
            const stagesRes = await axios.get('http://localhost:8080/api/stages');
            setStages(stagesRes.data);
        };

        const fetchDeals = async () => {
            const dealsRes = await axios.get('http://localhost:8080/api/deals');
            setDeals(dealsRes.data);
        };

        fetchStages();
        fetchDeals();
    }, []);

    const getDealsForStage = (stageId) => {
        return deals.filter((deal) => deal.stage.id === stageId);
    };

    // This function is called when an item is dropped into a new column
    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        // Check if the item was dropped outside of a valid destination
        if (!destination) {
            return;
        }

        // Check if the item was dropped in the same place (no change)
        if (destination.droppableId === source.droppableId) {
            return;
        }

        // Find the dragged deal by its ID
        const draggedDeal = deals.find((deal) => deal.id === parseInt(draggableId));

        // Update the stage of the dragged deal
        const updatedDeal = { ...draggedDeal, stage: { id: parseInt(destination.droppableId) } };

        // Optimistically update the UI
        setDeals((prevDeals) =>
            prevDeals.map((deal) => (deal.id === draggedDeal.id ? updatedDeal : deal))
        );

        // Send the update request to the backend
        try {
            await axios.put(`http://localhost:8080/api/deals/${draggedDeal.id}`, updatedDeal);
        } catch (error) {
            console.error('Failed to update the deal', error);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                {stages.map((stage) => (
                    <StageColumn
                        key={stage.id}
                        stage={stage}
                        deals={getDealsForStage(stage.id)}
                    />
                ))}
            </div>
        </DragDropContext>
    );
};

export default Board;
