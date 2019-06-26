import React, {Component} from 'react';
import {redirectToTokopediaPage} from "./services/services";
import './Scanner.css'
import Overlay from "./components/Overlay/Overlay";
import Animation from "./components/Animation/Animation";
import ReticleBox from "./components/ReticleBox/ReticleBox";

class Scanner extends Component {
    constructor(props) {
        super(props);

        this.container = React.createRef();
        this.reticle = React.createRef();
        this.reticleBox = React.createRef();
        this.maskOuter = React.createRef();
        this.maskInner = React.createRef();
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
                    container: this.container.current,
                    reticle: this.reticle.current,
                    reticleBox: this.reticleBox.current,
                    maskOuter: this.maskOuter.current,
                    maskInner: this.maskInner.current
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
                    <svg ref={this.reticle} id="reticle" viewBox="0 0 133 100"
                         xmlns="http://www.w3.org/2000/svg">
                        <ReticleBox reticleBox={this.reticleBox} maskOuter={this.maskOuter} maskInner={this.maskInner}/>
                        <Animation/>
                    </svg>
                </div>
            </div>
        );
    }
}

export default Scanner;
