import React from 'react';
import './checkBox.css';

function CustomCheckbox() {
    return (
        <div className="custom-checkbox">
            <input type="checkbox" id="myCheckbox" checked />
            <label htmlFor="myCheckbox" className="checkbox-label">
                Checkbox
            </label>
        </div>
    );
}

export default CustomCheckbox;
