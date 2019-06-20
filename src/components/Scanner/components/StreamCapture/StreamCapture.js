import React, {Component} from 'react';

const streamCaptureStyle = {
    "host": {
        "position": "relative",
        "display": "flex",
        "width": "100%",
        "height": "100%",
        "overflow": "hidden",
        "background": "#333",
        "animation": "fadeIn 0.3s cubic-bezier(0, 0, 0.3, 1) forwards",
        "-baseline": "12px"
    },
    "canvas": {
        "width": "100%",
        "maxWidth": "100%",
        "maxHeight": "100%",
        "objectFit": "contain",
        "background": "#111"
    },
    "reticle": {
        "width": "100%",
        "height": "100%",
        "top": "0",
        "left": "0",
        "position": "absolute",
        "opacity": "0",
        "transition": "opacity 0.3s cubic-bezier(0, 0, 0.3, 1)"
    },
    "overlay": {
        "position": "absolute",
        "bottom": "50px",
        "left": "50%",
        "minWidth": "280px",
        "padding": "var(--baseline) calc(var(--baseline) * 2)",
        "background": "rgba(0, 0, 0, 0.5)",
        "borderRadius": "20px",
        "color": "#FFF",
        "transform": "translateX(-50%)",
        "textAlign": "center",
        "fontFamily": "Arial, Helvetica, sans-serif"
    }
};


class StreamCapture extends Component {
    constructor(props) {
        super(props);

        this.streamCapture = React.createRef();
        this.canvas = React.createRef();
        this.reticle = React.createRef();
        this.maskOuter = React.createRef();
        this.maskInner = React.createRef();
        this.reticleBox = React.createRef();
    }

    render() {
        return (
            <div ref={this.streamCapture} style={streamCaptureStyle}>
                <svg ref={this.reticle} id="reticle" viewBox="0 0 133 100"
                     xmlns="http://www.w3.org/2000/svg">z
                    <mask id="reticle-cut-out">
                        <rect ref={this.maskOuter} id="reticle-cut-out-outer" width="133" height="100" x="0" y="0"
                              fill="#FFF"/>
                        <rect ref={this.maskInner} id="reticle-cut-out-inner" x="24" y="8" width="85" height="85" rx="2"
                              ry="2" fill="#000"/>
                    </mask>
                    <rect ref={this.reticleBox} id="reticle-box" width="133" height="100" x="0" y="0"
                          fill="rgba(0,0,0,0.4)" mask="url(#reticle-cut-out)"/>
                </svg>
                <canvas ref={this.canvas}/>
            </div>
        );
    }
}

export default StreamCapture;
