import React from 'react';

const YesNoSelect = ({ label, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>
    );
};

export default YesNoSelect;
