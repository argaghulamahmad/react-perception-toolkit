import React, {Component} from 'react';
import {redirectToTokopediaPage} from "./services/services";
import {importPerceptionToolkit} from "./perception-toolkit";
import StreamCapture from "./components/StreamCapture/StreamCapture";

class Scanner extends Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        console.log('didMount', this);

        const initPerceptionToolkit = async () => {
            window.PerceptionToolkit = window.PerceptionToolkit || {};
            window.PerceptionToolkit.config = {
                debugLevel: 'verbose',
                callback: redirectToTokopediaPage
            };
        };

        importPerceptionToolkit().then(console.log('importPerceptionToolkit', this));
        initPerceptionToolkit().then(console.log('configPerceptionToolkit', this));
    }

    render() {
        return (
            <div>
                <StreamCapture/>
            </div>
        );
    }
}

export default Scanner;
