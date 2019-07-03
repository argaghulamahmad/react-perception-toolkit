import React, {Component} from 'react';
import Scanner from "../Scanner/Scanner";
import ScannerJs from "../ScannerJs/ScannerJs";
import "./Benchmark.css"

class Benchmark extends Component {
    render() {
        return (
            <div>
                <div className={"split left"}>
                    <Scanner/>
                </div>
                <div className={"split right"}>
                    <ScannerJs/>
                </div>
            </div>
        );
    }
}

export default Benchmark;
