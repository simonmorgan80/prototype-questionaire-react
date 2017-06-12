import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = (props) => (
    <div className="field">
        <label className="field_label" htmlFor={props.name} >{props.title}</label>
        <div className="field_control field_control--select">
            <select
                className="field_select"
                name={props.name}
                defaultValue={props.selectedOption}
                onChange={props.controlFunc}>
                <option value="">{props.placeholder}</option>
                {
                    props.options.map(opt => {
                        return (
                            <option
                                key={opt}
                                value={opt}
                            >
                            {opt}
                            </option>
                        );
                    })
                }
            </select>
        </div>
    </div>
)

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedOption:PropTypes.string,
    controlFunc: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default SelectInput;