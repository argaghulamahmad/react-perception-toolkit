import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import Overlay from "../Scanner/components/Overlay/Overlay";
import "./ScannerJs.css"
import {redirectToTokopediaPage} from "../Scanner/services/services";

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

class ScannerJs extends Component {
    state = {
        fps: 0
    };

    updateFps= () => {
        this.setState({
            fps: fpsCounter
        })
    };

    componentDidMount() {
        setInterval(this.updateFps, 1000);
    }

    handleScan = data => {
        if (data) {
            alert("JS SCANNER");
            redirectToTokopediaPage(data);
        }
    };
    handleError = err => {
        console.error(err)
    }
    render() {
        return (
            <div style={{
                "height": "100%",
                "width": "100%",
                "position": "fixed",
                "top": "0",
                "left": "0",
                "background": "#333",
                "zIndex": "1"
            }}>
                <Overlay message={"fps: " + this.state.fps}/>
                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{
                        "width": "100%",
                        "margin": "0",
                        "position": "absolute",
                        "top": "50%",
                        "MsTransform": "translateY(-50%)",
                        "transform": "translateY(-50%)"
                    }}
                />
                <svg ref={this.reticle} id="reticle" viewBox="0 0 600 600"
                     xmlns="http://www.w3.org/2000/svg">
                    <svg viewBox="0 0 600 600">
                        <mask id="reticle-cut-out">
                            <rect id="reticle-cut-out-outer" width="600" height="600" x="0" y="0"
                                  fill="#FFF"/>
                            <rect id="reticle-cut-out-inner" x="10%" y="10%" width="500" height="500" rx="2"
                                  ry="2" fill="#000"/>
                        </mask>
                        <rect id="reticle-box" width="600" height="600" x="0" y="0"
                              fill="rgba(0,0,0,0.4)" mask="url(#reticle-cut-out)"/>
                    </svg>
                </svg>
            </div>
        )
    }
}

export default ScannerJs;
