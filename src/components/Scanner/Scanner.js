import React, {Component} from 'react';
import {openUrl} from "./services/services";
import {importPerceptionToolkit} from "./perception-toolkit";

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetText: 'test'
        }
    };

    componentDidMount() {
        console.log('didMount', this);

        const cardContainer = document.body.querySelector('.container');
        const startButton = document.getElementById('get-started');

        const initPerceptionToolkit = async () => {
            window.PerceptionToolkit = window.PerceptionToolkit || {};
            window.PerceptionToolkit.config = {
                debugLevel: 'verbose',
                button: startButton,
                cardContainer: cardContainer,
                callback: openUrl
            };
        };

        importPerceptionToolkit().then(console.log('importPerceptionToolkit', this));
        initPerceptionToolkit().then(console.log('configPerceptionToolkit', this));
    }

    render() {
        return (
            <div>
                <h2>Scanner</h2>
                <div className="container"/>
                <button id="get-started">Get started</button>
                <p>{this.state.targetText}</p>
            </div>
        );
    }
}

export default Scanner;
