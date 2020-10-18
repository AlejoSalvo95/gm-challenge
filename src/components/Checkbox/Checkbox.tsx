import React, { Component } from "react";
interface CheckboxProps {
    handleCheckboxChange: () => void;
    label: string;
    isChecked: boolean;
}
class Checkbox extends Component<CheckboxProps> {


    render() {
        const { label, isChecked, handleCheckboxChange } = this.props;

        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />

                    {label}
                </label>
            </div>
        );
    }
}


export default Checkbox;
