import React from 'react';
import './Animation.css'

const Animation = () => (
    <svg viewBox="0 0 133 100">
        <defs>
            <linearGradient id="lgrad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" style={{"stopColor": "rgb(99,199,82)", "stopOpacity": "1"}}/>
                <stop offset="10%" style={{"stopColor": "transparent", "stopOpacity": "1"}}/>
            </linearGradient>
        </defs>
        <rect x="24" y="90" width="85" height="85" fill="url(#lgrad)"
              className={'animation'}/>
    </svg>
);

export default Animation;
