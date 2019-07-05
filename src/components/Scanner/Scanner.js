import React, {Component} from 'react';
import {redirectToTokopediaPage} from "./services/services";
import './Scanner.css'
import Overlay from "./components/Overlay/Overlay";

class Scanner extends Component {
    constructor(props) {
        super(props);

        this.container = React.createRef();
    };

    componentDidMount() {
        console.log('didMount', this);

        const configPerceptionToolkit = async () => {
            window.PerceptionToolkit = window.PerceptionToolkit || {};
            window.PerceptionToolkit.config = {
                debugLevel: 'verbose',
                callback: redirectToTokopediaPage,
                container: this.container.current
            };

            window.PerceptionToolkit.StreamCapture = {
                layoutRefs: {
                    container: this.container.current
                }
            };
        };

        configPerceptionToolkit().then(console.log('configPerceptionToolkit', this));

        const importPerceptionToolkit = async () => {
            await import('./perception-toolkit/lib/src/polyfill/barcode-detector')
                .then(module => {
                    window.BarcodeDetector = module.BarcodeDetectorPolyfill
                });
            await import('./perception-toolkit/lib/perception-toolkit')
                .then(module => {
                    console.log('perceptionToolkit installed!', {module});
                });
            window.PerceptionToolkit.Functions.initializeExperience();
        };

        importPerceptionToolkit();
    }

    componentWillUnmount() {
        window.PerceptionToolkit.Functions.closeExperience();
    }

    render() {
        return (
            <div id={'scanner'}>
                <Overlay message="Arahkan kode QR ke area yang telah ditentukan"/>
                <div id='stream-capture-container' ref={this.container}>
                    <div className="square">
                        <div className="square-inner"/>
                        <div className="scan"/>
                    </div>
                    <canvas id="capture-canvas"/>
                    <video id="capture-video"/>
                </div>
            </div>
        );
    }
}

export default Scanner;
