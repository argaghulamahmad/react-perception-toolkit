import React from 'react';

function ReticleBox() {
    return (
        <svg viewBox="0 0 133 100">
            <mask id="reticle-cut-out">
                <rect id="reticle-cut-out-outer" width="133" height="100" x="0" y="0"
                      fill="#FFF"/>
                <rect id="reticle-cut-out-inner" x="24" y="8" width="85" height="85" rx="2"
                      ry="2" fill="#000"/>
            </mask>
            <rect id="reticle-box" width="133" height="100" x="0" y="0"
                  fill="rgba(0,0,0,0.4)" mask="url(#reticle-cut-out)"/>
        </svg>
    );
}

export default ReticleBox;
