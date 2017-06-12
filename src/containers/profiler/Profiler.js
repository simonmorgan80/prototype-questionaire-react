import React, { Component } from 'react';
import Introduction from '../introduction/Introduction';
import QuestionList from '../questionlist/QuestionList';
import Personal from '../personal/Personal';
import Result from '../result/Result';

import QUESTIONDATA from '../../data/QuestionData.js';

let profileData = {
    // name: 'Simon',
    // location: 'London',
    // company_size: '251-1000',
    // q1: 6,
    // q2: 4,
    // q3: 2,
    // q4: 3,
    // q5: 5,
    // q6: 3,
    // q7: 1,
    // q8: 2,
    // q9: 4,
    // q10: 7,
    // q11: 3,
    // q12: 2
}

class Profiler extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            step: 1
        }

        this.questionData = this.shuffle(QUESTIONDATA);
        this.saveData = this.saveData.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.goToStart = this.goToStart.bind(this);
        this.postData = this.postData.bind(this)
    }

    postData() {
        //todo
    }

    checkData(questionId) {
        let answerPresent = profileData[questionId];

        if (answerPresent === undefined || answerPresent === null) {
            return false;
        } else {
            return true;
        }
    }

    saveData(data) {
        profileData = Object.assign({}, profileData, data);
        console.log(profileData);
    }

    nextStep() {
        this.setState({
            step : this.state.step + 1
        })
    }

    prevStep() {
        this.setState({
            step : this.state.step - 1
        })
    }

    goToStart() {
        this.setState({
            step : 1
        })
    }

    shuffle(array) {
        var m = array.length, 
            t, 
            i;

        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    render() {
        switch (this.state.step) {
            
            case 1:
                return <Introduction nextStep={this.nextStep} />
            case 2:
                return <QuestionList 
                    key="fieldset1"
                    answerData={profileData}
                    saveData={this.saveData} 
                    checkData={this.checkData}
                    nextStep={this.nextStep} 
                    prevStep={this.prevStep} 
                    questionData={this.questionData.slice(0, 3)}
                    step={this.state.step}
                />
            case 3:
                return <QuestionList 
                    key="fieldset2"
                    answerData={profileData}
                    saveData={this.saveData} 
                    checkData={this.checkData}
                    nextStep={this.nextStep} 
                    prevStep={this.prevStep} 
                    questionData={this.questionData.slice(3, 6)}
                    step={this.state.step}
                />
            case 4:
                return <QuestionList
                    key="fieldset3"
                    answerData={profileData}
                    saveData={this.saveData} 
                    checkData={this.checkData}
                    nextStep={this.nextStep} 
                    prevStep={this.prevStep} 
                    questionData={this.questionData.slice(6, 9)}
                    step={this.state.step}
                />
            case 5:
                return <QuestionList
                    key="fieldset4"
                    answerData={profileData}
                    saveData={this.saveData} 
                    checkData={this.checkData}
                    nextStep={this.nextStep} 
                    prevStep={this.prevStep} 
                    questionData={this.questionData.slice(9, 12)}
                    step={this.state.step}
                />
            case 6:
                return <Personal 
                    answerData={profileData}
                    saveData={this.saveData} 
                    checkData={this.checkData}
                    nextStep={this.nextStep} 
                    prevStep={this.prevStep}
                    step={this.state.step}
                />
            case 7:
                return <Result 
                    saveData={this.saveData} 
                    questionData={this.questionData} 
                    answerData={profileData}
                    postData={this.postData}
                    goToStart={this.goToStart}
                    step={this.state.step}
                />
            
            default: 
                return <Introduction nextStep={this.nextStep} />
        }
    }
}

export default Profiler;