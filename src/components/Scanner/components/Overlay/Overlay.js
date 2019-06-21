import React from 'react';
import './Overlay.css'

const Overlay = (props) => (
    <div className={'overlay'}>
            <span>
                {props.message}
            </span>
    </div>
);

export default Overlay;
