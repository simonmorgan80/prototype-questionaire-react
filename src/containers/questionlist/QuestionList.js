import React, { Component } from 'react';
import Question from '../../components/question/Question';
import Progress from '../../components/progress/Progress';
import './Questionlist.css';

class QuestionList extends Component {

    constructor(props) {
        super(props);
        
        this.handleAnswer = this.handleAnswer.bind(this);
    
        this.options = [
            { id: 1, 'label': 'Nothing like me' , 'value': 1 },
            { id: 2, 'label': 'Very unlike me' , 'value': 2 },
            { id: 3, 'label': 'Unlike me' , 'value': 3 },
            { id: 4, 'label': 'Neither like/unlike' , 'value': 4 },
            { id: 5, 'label': 'Like me' , 'value': 5 },
            { id: 6, 'label': 'Very like me' , 'value': 6 },
            { id: 7, 'label': 'Exactly like me' , 'value': 7 }
        ];

        this.state = {
            showError: false,
        };

    }

    handleAnswer(e) {

        this.setState({
            [e.target.name] : +e.target.value
        })

        this.props.saveData({ [e.target.name] : +e.target.value });

    }

    isValid () {

        let stepValid = true;

        this.props.questionData.forEach(
            (question) => {
                let questionId = 'q' + question.id,
                    answerFound = this.props.checkData(questionId);

                if (answerFound === false) {
                    stepValid = false;
                    return;
                }
                
            }
        )

        return stepValid;

    }

    render() {
        // console.log(this.state);
        return (
            <section className="section section--background">
                <div className="container">

                    <Progress step={this.props.step}></Progress>
                    
                    <header className="header header--step">
                        <h1 className="heading--medium">Please select the answer which best fits you</h1>
                    </header>

                    <ul className="profiler-labels">
                        {
                            this.options.map (
                                (options) => {
                                    return (
                                        <li className="profiler-labels_item" key={options.id} >
                                            {options.label}
                                        </li>
                                    )
                                }
                            ) 
                        }
                    </ul>

                    <div className="form--profiler">

                        {
                            this.props.questionData.map (
                                (question) => {
                                    return (
                                        <Question 
                                            key={question.id} 
                                            question={question} 
                                            controlFunction={this.handleAnswer}
                                            options={this.options}
                                            selectedOption={this.props.answerData['q' + question.id]}
                                        />
                                    )
                                }
                            ) 
                        }

                        <div className="form-navigation">
                            
                            {
                            this.state.showError
                                ? 
                                <div className="message message--error">
                                    Please answer all questions
                                </div>
                                : null
                            }

                            <div className="button-group">
                                <div className="button-group_item">
                                    <button onClick={ this.goToPrevStep.bind(this) } type="button" className="button" >&lt; Previous</button>
                                </div>
                                <div className="button-group_item">
                                     <button onClick={ this.goToNextStep.bind(this) } className="button">Next Step</button>                  
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>

            </section>
        )
    }

    goToPrevStep(e) {
        
        this.props.prevStep();

    }

    goToNextStep(e) {
        e.preventDefault();

        if (this.isValid()) {

            this.props.nextStep();

        } else {

            this.setState({
                showError: true
            })
        }
        
    }
}

export default QuestionList;