import React, { Component } from 'react';
import './Progress.css';
// import PropTypes from 'prop-types';

class Progress extends Component {

    // constructor(props) {
    //     super(props);

        
    // }

    render() {

        return (
            <ul className="progress">
                <li className="progress_item is-complete">
                    <span className="sr-only">Home</span>

                    <img src="/images/home-icon.svg" className="icon icon--home" alt="Home"/>

                </li>
                <li className={"progress_item " + (+this.props.step >= 2 ? 'is-complete' : null) } >
                    1
                </li>
                <li className={"progress_item " + (+this.props.step >= 3 ? 'is-complete' : null) } >
                    2
                </li>
                <li className={"progress_item " + (+this.props.step >= 4 ? 'is-complete' : null) } >
                    3
                </li>
                <li className={"progress_item " + (+this.props.step >= 5 ? 'is-complete' : null) } >
                    4
                </li>
                <li className={"progress_item " + (+this.props.step >= 6 ? 'is-complete' : null) } >
                    5
                </li>
                <li className={"progress_item progress_item--text " + (+this.props.step >= 7 ? 'is-complete' : null) } >
                    Result
                </li>
            </ul>
        )
    }
}

export default Progress;