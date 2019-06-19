import React, {Component} from 'react';
import {redirectToTokopediaPage} from "./services/services";
import {importPerceptionToolkit} from "./perception-toolkit";

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.scannerStartButton = React.createRef();
    };

    componentDidMount() {
        console.log('didMount', this);

        const initPerceptionToolkit = async () => {
            window.PerceptionToolkit = window.PerceptionToolkit || {};
            window.PerceptionToolkit.config = {
                debugLevel: 'verbose',
                button: this.scannerStartButton.current,
                callback: redirectToTokopediaPage
            };
        };

        importPerceptionToolkit().then(console.log('importPerceptionToolkit', this));
        initPerceptionToolkit().then(console.log('configPerceptionToolkit', this));
    }

    render() {
        return (
            <div>
                <button ref={this.scannerStartButton} id="get-started">Get started</button>
            </div>
        );
    }
}

export default Scanner;
