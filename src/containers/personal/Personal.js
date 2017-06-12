import React, { Component } from 'react';
import Progress from '../../components/progress/Progress';
import Textinput from '../../components/textinput/Textinput';
import Selectinput from '../../components/selectinput/Selectinput';
import './Personal.css';

class Personal extends Component {

    constructor(props) {
        super(props);

        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

        this.size_options = [
            '1-250',
            '251-1000',
            '1001-5000',
            '5000+'
        ]

        this.fieldnames = [
            'name',
            'location',
            'company_size'
        ]

        this.state = {
            showError: false
        };
    }

    handleTextInputChange (e) {

        this.props.saveData({ [e.target.name] : e.target.value });

    }

    handleSelectChange (e) {

        this.props.saveData({ [e.target.name] : e.target.value });

    }

    isValid () {

        let stepValid = true;

        this.fieldnames.forEach(
            (field) => {
                let dataFound = this.props.checkData(field);

                if (dataFound === false) {
                    stepValid = false;
                    return;
                }
                
            }
        )

        return stepValid;

    }

    render() {
        
        return (
            <section className="section section--background">

                <div className="container">

                    <Progress step={this.props.step}></Progress>

                    <header className="header header--personal">
                        <h1 className="heading--medium">Please tell us about yourself</h1>
                    </header>

                    <div className="form form--profiler">
                
                        <div className="fieldset--wrapper">

                            <fieldset className="fieldset fieldset--personal">

                                <Textinput
                                  inputType={'text'}
                                  title={'Name'}
                                  name={'name'}
                                  controlFunc={this.handleTextInputChange}
                                  content={this.props.answerData.name}
                                />

                                <Textinput
                                  inputType={'text'}
                                  title={'Location'}
                                  name={'location'}
                                  controlFunc={this.handleTextInputChange}
                                  content={this.props.answerData.location}
                                />

                                <Selectinput
                                  title={'Number of employees'}
                                  name={'company_size'}
                                  placeholder={'Please select'}
                                  controlFunc={this.handleSelectChange}
                                  options={this.size_options}
                                  selectedOption={this.props.answerData.company_size} 
                                />

                            </fieldset>

                        </div>

                    </div>

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
            </section>
        )
    }

    goToPrevStep(e) {
        e.preventDefault();
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

export default Personal;