import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import ReticleBox from "../Scanner/components/ReticleBox/ReticleBox";
import Animation from "../Scanner/components/Animation/Animation";
import Overlay from "../Scanner/components/Overlay/Overlay";
import "./ScannerJs.css"

class ScannerJs extends Component {
    state = {
        result: 'No result'
    };

    handleScan = data => {
        if (data) {
            alert('Js Scanner - Kode QR yang Anda scan invalid')
        }
    }
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
                <Overlay message="Arahkan kode QR ke area yang telah ditentukan"/>
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
