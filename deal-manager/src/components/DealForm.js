import React, { useState, useEffect } from 'react';
import api from '../services/api';

const DealForm = ({ dealId }) => {
    const [deal, setDeal] = useState({ name: '', amount: 0, stageId: '' });
    const [stages, setStages] = useState([]);

    useEffect(() => {
        fetchStages();
        if (dealId) {
            fetchDeal();
        }
    }, [dealId]);

    const fetchStages = async () => {
        try {
            const response = await api.get('/stages');
            setStages(response.data);
        } catch (error) {
            console.error("Error fetching stages:", error);
        }
    };

    const fetchDeal = async () => {
        try {
            const response = await api.get(`/deals/${dealId}`);
            setDeal({
                name: response.data.name,
                amount: response.data.amount,
                stageId: response.data.stage.id,
            });
        } catch (error) {
            console.error("Error fetching deal:", error);
        }
    };

    const handleChange = (e) => {
        setDeal({ ...deal, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dealId) {
                await api.put(`/deals/${dealId}`, { ...deal, stage: { id: deal.stageId } });
            } else {
                await api.post('/deals', { ...deal, stage: { id: deal.stageId } });
            }
            alert('Deal saved successfully!');
        } catch (error) {
            console.error("Error saving deal:", error);
        }
    };

    return (
        <div className="container">
            <h2>{dealId ? "Update Deal" : "Create Deal"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Deal Name</label>
                    <input type="text" className="form-control" name="name" value={deal.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" className="form-control" name="amount" value={deal.amount} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="stageId">Stage</label>
                    <select className="form-control" name="stageId" value={deal.stageId} onChange={handleChange} required>
                        <option value="">Select Stage</option>
                        {stages.map(stage => (
                            <option key={stage.id} value={stage.id}>{stage.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save Deal</button>
            </form>
        </div>
    );
};

export default DealForm;
