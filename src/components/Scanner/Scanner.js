import React, {Component} from 'react';
import {redirectToTokopediaPage} from "./services/services";
import {importPerceptionToolkit} from "./perception-toolkit";

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetText: 'test'
        };
        this.scannerStartButton = React.createRef();
    };

    componentDidMount() {
        console.log('didMount', this);

        const startButton = this.scannerStartButton.current;

        const initPerceptionToolkit = async () => {
            window.PerceptionToolkit = window.PerceptionToolkit || {};
            window.PerceptionToolkit.config = {
                debugLevel: 'verbose',
                button: startButton,
                callback: redirectToTokopediaPage
            };
        };

        importPerceptionToolkit().then(console.log('importPerceptionToolkit', this));
        initPerceptionToolkit().then(console.log('configPerceptionToolkit', this));
    }

    render() {
        return (
            <div>
                <h2>Scanner</h2>
                <button ref={this.scannerStartButton} id="get-started">Get started</button>
                <p>{this.state.targetText}</p>
            </div>
        );
    }
}

export default Scanner;
