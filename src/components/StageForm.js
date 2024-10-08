import React, { useState } from "react";
import axios from "axios";

const StageForm = ({ onStageAdded }) => {
    const [stage, setStage] = useState({
        name: "",
        description: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStage({ ...stage, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://myadsusa-oqs.herokuapp.com/api/stages", stage)
            .then((response) => {
                onStageAdded(response.data);
                setStage({
                    name: "",
                    description: ""
                });
            })
            .catch((error) => {
                console.error("There was an error creating the stage!", error);
            });
    };

    return (
        <div className="stage-form">
            <h2>Create New Stage</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Stage Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={stage.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Stage Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={stage.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit">
                    Add Stage
                </button>
            </form>
        </div>
    );
};

export default StageForm;
