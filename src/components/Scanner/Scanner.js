import React, {Component} from 'react';
import {redirectToTokopediaPage} from "./services/services";
import {importPerceptionToolkit} from "./perception-toolkit";
import './Scanner.css'

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

        const initPerceptionToolkit = async () => {
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

        importPerceptionToolkit().then(console.log('importPerceptionToolkit', this));
        initPerceptionToolkit().then(console.log('configPerceptionToolkit', this));
    }

    render() {
        return (
            <div id='stream-capture-container' ref={this.container}>
                <svg ref={this.reticle} id="reticle" viewBox="0 0 133 100"
                     xmlns="http://www.w3.org/2000/svg">
                    <mask id="reticle-cut-out">
                        <rect id="reticle-cut-out-outer" width="133" height="100" x="0" y="0"
                              fill="#FFF" ref={this.maskOuter} />
                        <rect id="reticle-cut-out-inner" x="24" y="8" width="85" height="85" rx="2"
                              ry="2" fill="#000" ref={this.maskInner}/>
                    </mask>
                    <rect id="reticle-box" ref={this.reticleBox} width="133" height="100" x="0" y="0"
                          fill="rgba(0,0,0,0.4)" mask="url(#reticle-cut-out)"/>
                </svg>
            </div>
        );
    }
}

export default Scanner;
