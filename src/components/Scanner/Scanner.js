import React, {Component} from 'react';

import initPerceptionToolKit from '../../initPerceptionToolkit';


class Scanner extends Component {
    componentDidMount() {
        initPerceptionToolKit();

        window.PerceptionToolkit.config = {
            button: document.getElementById('get-started'),
            cardContainer: document.body.querySelector('.container'),
            onboarding: false,
            artifactSources: [

            ],
            debugLevel: 'verbose',
        };

        console.log(window.PerceptionToolkit);
    }

    render() {
        return (
            <div>
                <h2>Scanner</h2>
                <div className="container"/>
                <button id="get-started">Get started</button>
            </div>
        );
    }
}

export default Scanner;
