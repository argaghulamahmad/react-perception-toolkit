import React, {Component} from 'react';

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetText: 'test'
        }
    };

    componentDidMount() {
        const cardContainer = document.body.querySelector('.container');
        const startButton = document.getElementById('get-started');

        console.log('didMount', this);

        const addEventListeners = () => {
            console.log('addEventListeners', this);

            const {Events, Elements} = window.PerceptionToolkit;

            window.addEventListener(Events.PerceivedResults, (evt) => {
                console.log('evt', this);

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

                    this.setState({
                        targetText: found[0].artifact.arTarget[0].text
                    });

                    const button = new Elements.ActionButton();
                    button.label = 'Find on Tokopedia';
                    button.addEventListener('click', () => {
                        let url = "https://www.tokopedia.com/search?st=product&q=";
                        let productName = found[0].content.name;
                        let searchUrl = url + productName;
                        window.open(searchUrl, '_blank');
                        card.close();
                    });
                    card.appendChild(button);

                    return;
                }
            });

            window.addEventListener(Events.CameraAccessDenied, () => {
                /*TODO use our own created component*/
            });

            window.addEventListener(Events.DeviceNotSupported, () => {
                /*TODO use our own created component*/
            });
        };

        const initScanner = async () => {
            window.PerceptionToolkit = window.PerceptionToolkit || {};
            window.PerceptionToolkit.config = {
                debugLevel: 'verbose',
                detectionMode: 'active',
                button: startButton,
                cardContainer: cardContainer,
                onboarding: false,
                artifactSources: [],
                onload() {
                    addEventListeners();
                }
            };
        };

        const importPerceptionToolkit = async () => {
            await import('../../perception-toolkit/lib/src/polyfill/barcode-detector')
                .then(module => {
                    window.BarcodeDetector = class CustomBarcodeDetectorPolyfill extends module.BarcodeDetectorPolyfill {
                        constructor() {
                            // hardcode the script for the worker to run for now
                            // TODO: add webpack worker loader to handle dynamically named worker script
                            super('/barcode-detector_worker.js');
                        }
                    }
                });
            await import('../../perception-toolkit/lib/perception-toolkit/bootstrap')
                .then(module => {
                    console.log('perceptionToolkit installed!', {module});
                })
        };

        // noinspection JSIgnoredPromiseFromCall
        importPerceptionToolkit();
        initScanner();
    }

    render() {
        return (
            <div>
                <h2>Scanner</h2>
                <div className="container"/>
                <button id="get-started">Get started</button>
                <p>{this.state.targetText}</p>
            </div>
        );
    }
}

export default Scanner;
