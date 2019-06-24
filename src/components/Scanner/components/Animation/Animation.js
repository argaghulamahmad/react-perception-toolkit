import React, {Component} from 'react';
import './Animation.css'

class Animation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animateUp: false
        };
    }


    componentDidMount() {
        setInterval(() => {
            if (this.state.animateUp) {
                this.setState(
                    {
                        animateUp: false
                    }
                )
            } else {
                this.setState(
                    {
                        animateUp: true
                    }
                )
            }
        }, 1000)
    }

    render() {
        return (
            <svg viewBox="0 0 133 100">
                <defs>
                    <linearGradient id="lgrad" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" style={{"stopColor": "rgb(99,199,82)", "stopOpacity": "1"}}/>
                        <stop offset="10%" style={{"stopColor": "transparent", "stopOpacity": "1"}}/>
                    </linearGradient>
                </defs>
                <rect x="24" y="90" width="85" height="85" fill="url(#lgrad)"
                      className={this.state.animateUp ? 'animation up' : 'animation down'}/>
            </svg>
        );
    }
}

export default Animation;
