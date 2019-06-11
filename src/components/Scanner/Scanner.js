import React, {Component} from 'react';

import initPerceptionToolKit from '../../initPerceptionToolkit';

class Scanner extends Component {
    componentDidMount() {
        initPerceptionToolKit();

        async function init() {
            const cardContainer = document.body.querySelector('.container');

            window.PerceptionToolkit = window.PerceptionToolkit || {};
            window.PerceptionToolkit.config = {
                debugLevel: 'verbose',

                detectionMode: 'active',

                button: document.getElementById('get-started'),

                cardContainer: cardContainer,

                onboarding: false,

                artifactSources: [],

                onload() {
                    addEventListeners();
                }
            };

            function addEventListeners() {
                const {Events, Elements} = window.PerceptionToolkit;

                window.addEventListener(Events.PerceivedResults, (evt) => {
                    const {found, lost} = evt.detail;

                    window.evt = evt;

                    if (found.length !== 0) {
                        const notRecognizedCard =
                            cardContainer.querySelector('[data-not-recognized]');
                        if (notRecognizedCard) {
                            notRecognizedCard.remove();
                        }
                    }

                    if (cardContainer.childNodes.length > 0) {
                        return;
                    }

                    if (found.length === 0 && found.length === 0) {
                        evt.preventDefault();

                        const card = new Elements.Card();
                        card.src = 'Sorry, this item was not recognized.';
                        card.dataset.notRecognized = true;
                        cardContainer.appendChild(card);
                        return;
                    }

                    if (found.length > 0) {
                        evt.preventDefault();

                        const card = new Elements.Card();
                        card.src = found[0].content;
                        cardContainer.appendChild(card);

                        const button = new Elements.ActionButton();
                        button.label = 'Find on Tokopedia';
                        button.addEventListener('click', () => {
                            console.log(found);
                            console.log('clicked');
                            let url = "https://www.tokopedia.com/search?st=product&q=";
                            let productName = found[0].content.name;
                            let searchUrl = url + productName;
                            window.open(searchUrl,'_blank');
                            card.close();
                        });
                        card.appendChild(button);

                        return;
                    }
                });

                window.addEventListener(Events.CameraAccessDenied, () => {
                    const card = new Elements.Card();
                    card.src = 'Camera unavailable or access denied';
                    cardContainer.appendChild(card);
                });

                window.addEventListener(Events.DeviceNotSupported, () => {
                    console.warn('Device Not Supported');
                });
            }
        }

        init();
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
