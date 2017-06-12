import React, { Component } from 'react';
import './Introduction.css';

class Introduction extends Component {

    render() {
        
        return (
            <section className="section">

                <div className="container">

                    <div className="welcome">

                        <h1 className="heading--large">Prototype multistep form</h1>
                        
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae eos est saepe ipsa illum laboriosam dolores animi velit, corporis, officiis tempora commodi voluptatibus accusantium adipisci, voluptas magnam atque in quas.</p>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas doloribus sapiente, quisquam ipsum deserunt voluptates aliquam suscipit provident, quae explicabo tempore debitis? Aspernatur harum perferendis illo aut similique, magnam molestias.20</p>

                        <button onClick={ this.goToNextStep.bind(this) } className="button">Start</button>

                    </div>

                </div>
            </section>
        )
    }

    goToNextStep(e) {
        e.preventDefault();
        this.props.nextStep();
    }
}

export default Introduction;