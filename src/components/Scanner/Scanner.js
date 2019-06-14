import React, {Component} from 'react';
import {openUrl} from "./services/services";

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetText: 'test'
        }
    };

    componentDidMount() {
        const cardContainer = document.body.querySelector('.container');
        const startButton = document.getElementById('get-started');

        console.log('didMount', this);

        const initScanner = async () => {
            window.PerceptionToolkit = window.PerceptionToolkit || {};
            window.PerceptionToolkit.config = {
                debugLevel: 'verbose',
                button: startButton,
                cardContainer: cardContainer,
                callback: openUrl
            };
        };

        const importPerceptionToolkit = async () => {
            await import('./perception-toolkit/lib/src/polyfill/barcode-detector')
                .then(module => {
                    window.BarcodeDetector = class CustomBarcodeDetectorPolyfill extends module.BarcodeDetectorPolyfill {
                        constructor() {
                            /*Hardcoded the script for the worker to run for now.
                            TODO: add webpack worker loader to handle dynamically named worker script*/
                            super('barcode-detector_worker.js');
                        }
                    }
                });
            await import('./perception-toolkit/lib/perception-toolkit/bootstrap')
                .then(module => {
                    console.log('perceptionToolkit installed!', {module});
                })
        };

        let importedPerceptionToolkit = importPerceptionToolkit();
        let ignitedScanner = initScanner();
        console.log('importPerceptionToolkit', importedPerceptionToolkit);
        console.log('initScanner', ignitedScanner);
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
