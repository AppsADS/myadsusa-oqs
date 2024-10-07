import React, { useState, useEffect } from "react";
import axios from "axios";

const DealForm = ({ onDealAdded }) => {
    const [deal, setDeal] = useState({
        name: "",
        amount: "",
        stageId: ""
    });

    const [stages, setStages] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/stages")
            .then((response) => {
                setStages(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the stages!", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeal({ ...deal, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://myadsusa-oqs-back.herokuapp.com/api/deals", {
                ...deal,
                stage: { id: deal.stageId } // Sending stage object as per the backend requirement
            })
            .then((response) => {
                onDealAdded(response.data);
                setDeal({
                    name: "",
                    amount: "",
                    stageId: ""
                });
            })
            .catch((error) => {
                console.error("There was an error creating the deal!", error);
            });
    };

    return (
        <div className="deal-form">
            <h2>Create New Deal</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Deal Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={deal.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Deal Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={deal.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stageId">Stage</label>
                    <select
                        id="stageId"
                        name="stageId"
                        value={deal.stageId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a stage</option>
                        {stages.map((stage) => (
                            <option key={stage.id} value={stage.id}>
                                {stage.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn-submit">
                    Add Deal
                </button>
            </form>
        </div>
    );
};

export default DealForm;
