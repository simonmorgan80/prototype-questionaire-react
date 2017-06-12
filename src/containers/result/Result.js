import React, { Component } from 'react';
import Progress from '../../components/progress/Progress';
import './Result.css';

class Result extends Component {

    constructor(props) {
        super(props);
        this.getResult();
    }

    getResult () {

        // calculate individual scores
        let group1 = this.filterQuestions('profile_type1');
        let group2 = this.filterQuestions('profile_type2');
        let group3 = this.filterQuestions('profile_type3');
        let group4 = this.filterQuestions('profile_type4');

        this.result = this.getProfileType([group1, group2, group3, group4])

        // get summary 
        this.getProfileSummary(this.result.type_name, this.result.subtype_name);

        // save data
        this.props.saveData(this.result);

        // post data
        this.props.postData();

    }

    getAnswer(questionId) {

        return this.props.answerData['q' + questionId];

    }

    filterQuestions(profileType) {
        
        // filter by type
        let profileTypeAnswers = this.props.questionData.filter((question) =>  question.type === profileType)

        // add user answers
        profileTypeAnswers.forEach(
            (question) => {
                question.score = this.getAnswer(question.id)
            }
        )
        // console.log(profileType);
        // console.log(profileTypeAnswers);

        // get profiletype
        return this.getProfileTypeScore(profileTypeAnswers, profileType);

    }

    getProfileTypeScore(answers, type) {

        let subtractValue,
            divideValue;

        switch (type.toLowerCase()) {
            case 'profile_type1':
                subtractValue = 13.21;
                divideValue = 2.54;
                break;
            case 'profile_type2':
                subtractValue = 13.50;
                divideValue = 2.24;
                break;
            case 'profile_type3':
                subtractValue = 12.26;
                divideValue = 2.27;
                break;
            case 'profile_type4':
                subtractValue = 11.50;
                divideValue = 2.78;
                break;
            default:            
        }

        // Sum of profile type questions
        let typeSum = answers.reduce(function(acc, cur) {            
            return acc + cur.score;
        }, 0);

        // Score of profile type questions between 5 and -5
        let typeScore = (typeSum - subtractValue) / divideValue;

        // Get highest score
        let subTypeHighestScore = answers.reduce(function(acc, cur) {
            return Math.max(acc, cur.score);
        }, 0);

        // filter for highest score questions & sort by weighting
        let subTypeResult = answers.filter(function(answers) {
            return answers.score === subTypeHighestScore;
        }).sort(function(a, b) {
            return a.weighting - b.weighting;
        });

        let profileTypeScore = {
            'type_name' : type,
            'type_score': typeScore,
            'type_sum': typeSum,
            'subtype_highscore': subTypeHighestScore,
            'subtype_name': subTypeResult[0].subtype
        }

        return profileTypeScore;

    }

    getProfileType(profiles) {
        // get type 
        let profileType = profiles.reduce(function(acc, cur) {
            return acc.type_score > cur.type_score ? acc : cur;
        });
        return profileType;
    }

    getProfileSummary(profileType, profileSubType) {

        let profileSummary = this.props.questionData.filter(function(profile) {
            return profile.subtype === profileSubType && profile.type === profileType;
        });

        let profileSummaryValue = profileSummary[0].summary.toString();

        this.profileSummary = profileSummaryValue;
        
    }

    goToStart (e) {
        e.preventDefault();
        this.props.goToStart();
    }

    render() {
        
        return (
            <section className="section">
                <div className="container">

                    <div className="profile">

                        <Progress step={this.props.step}></Progress>

                        <div className="profile_content">
                            <p className="lead profile_prefix">You are a</p>
                            <h1 className="profile_name heading--xlarge">{this.result.subtype_name} {this.result.type_name}</h1>
                            <p className="lead">{this.profileSummary}</p>
                            <button onClick={ this.goToStart.bind(this) } className="button">Start again</button>
                        </div>                        

                    </div>

                </div>
            </section>
        )
    }
}

export default Result;