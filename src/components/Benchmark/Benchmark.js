import React, {Component} from 'react';
import Scanner from "../Scanner/Scanner";
import "./Benchmark.css"

class Benchmark extends Component {
    render() {
        return (
            <div>
                <div>
                    <Scanner/>
                </div>
                <div>
                    Hello
                </div>
            </div>
        );
    }
}

export default Benchmark;
