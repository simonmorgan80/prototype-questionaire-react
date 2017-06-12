import React from 'react';
import PropTypes from 'prop-types';

const Textinput = (props) => (
    <div className="field">
        <label className="field_label" htmlFor={props.name}>{props.title}</label>
        <div className="field_control">
            <input 
                className="field_input"
                id={props.name}
                name={props.name}
                type={props.inputType}
                defaultValue={props.content}
                onChange={props.controlFunc}
                placeholder={props.placeholder}
            />
        </div>
    </div>
)

Textinput.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number']).isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    controlFunc: PropTypes.func.isRequired,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string
}

export default Textinput;