import React, { useEffect, useState } from 'react';
import api from '../services/api';

const StageList = () => {
    const [stages, setStages] = useState([]);

    useEffect(() => {
        fetchStages();
    }, []);

    const fetchStages = async () => {
        try {
            const response = await api.get('http://localhost:8080/api/stages');
            setStages(response.data);
        } catch (error) {
            console.error("Error fetching stages:", error);
        }
    };


    return (
        <div className="container">
            <h2>Stages</h2>
            <ul className="list-group">
                {stages.map(stage => (
                    <li key={stage.id} className="list-group-item">
                        {stage.name} - {stage.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StageList;
