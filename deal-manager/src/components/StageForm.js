import React, { useState, useEffect } from 'react';
import api from '../services/api';

const StageForm = ({ stageId }) => {
    const [stage, setStage] = useState({ name: '', description: '' });

    useEffect(() => {
        if (stageId) {
            fetchStage();
        }
    }, [stageId]);

    const fetchStage = async () => {
        try {
            const response = await api.get(`/stages/${stageId}`);
            setStage(response.data);
        } catch (error) {
            console.error("Error fetching stage:", error);
        }
    };

    const handleChange = (e) => {
        setStage({ ...stage, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (stageId) {
                await api.put(`/stages/${stageId}`, stage);
            } else {
                await api.post('/stages', stage);
            }
            alert('Stage saved successfully!');
            setStage({ name: '', description: '' }); // Clear form after saving
        } catch (error) {
            console.error("Error saving stage:", error);
        }
    };

    return (
        <div className="container">
            <h2>{stageId ? "Update Stage" : "Create Stage"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Stage Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={stage.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={stage.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {stageId ? "Update Stage" : "Create Stage"}
                </button>
            </form>
        </div>
    );
};

export default StageForm;
