import React, {Component} from 'react';
import {redirectToTokopediaPage} from "./services/services";
import './Scanner.css'
import Overlay from "./components/Overlay/Overlay";
// import Animation from "./components/Animation/Animation";
import ReticleBox from "./components/ReticleBox/ReticleBox";

const times = [];
let fpsCounter;

const refreshLoop = () => {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fpsCounter = times.length;
        refreshLoop();
    });
};

refreshLoop();

class Scanner extends Component {
    constructor(props) {
        super(props);

        this.container = React.createRef();
    };

    state = {
        fps: 0
    };

    updateFps= () => {
        this.setState({
            fps: fpsCounter
        })
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

        setInterval(this.updateFps, 1000);
    }

    componentWillUnmount() {
        window.PerceptionToolkit.Functions.closeExperience();
    }

    render() {
        return (
            <div id={'scanner'}>
                {/*<Overlay message="Arahkan kode QR ke area yang telah ditentukan"/>*/}
                <Overlay message={"fps: " + this.state.fps}/>
                <div id='stream-capture-container' ref={this.container}>
                    <svg ref={this.reticle} id="reticle" viewBox="0 0 133 100"
                         xmlns="http://www.w3.org/2000/svg">
                        <ReticleBox/>
                        {/*<Animation/>*/}
                    </svg>
                    <canvas id="capture-canvas"/>
                </div>
            </div>
        );
    }
}

export default Scanner;
