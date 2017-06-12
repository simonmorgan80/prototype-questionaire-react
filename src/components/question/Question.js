import React, { Component } from 'react';
import './Question.css';

class Question extends Component {

    render() {
        let questionID = this.props.question.id,
            questionText = this.props.question.text;
        return (
            <div className="question">
                
                <div className="question_text">{questionText}</div>
                <div className="question_options">
                {
                    this.props.options.map(
                        (options) => {
                            return (

                                <div className="field field--answer" key={options.id}>

                                    <input 
                                        type="radio" 
                                        name={'q' + questionID}
                                        value={options.value} 
                                        className="question_radio"
                                        id={'q' + questionID + 'v' + options.id}
                                        onChange={this.props.controlFunction}
                                        defaultChecked={this.props.selectedOption === (options.value)}
                                    />

                                    <label htmlFor={'q' + questionID + 'v' + options.id} className="question_label">
                                        {options.label}
                                    </label>

                                </div>

                            )
                        }
                    )
                }
                </div>
            </div>
        )
    }
}

export default Question;