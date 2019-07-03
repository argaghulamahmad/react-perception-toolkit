import React, {Component} from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';

import './App.css';
import Scanner from "./components/Scanner/Scanner";
import ScannerJs from "./components/ScannerJs/ScannerJs";
import Home from "./components/Home/Home";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/wasm-scanner/">Scanner Wasm</Link>
                            </li>
                            <li>
                                <Link to="/js-scanner/">Scanner Js</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={Home} />
                    <Route path="/wasm-scanner/" component={Scanner} />
                    <Route path="/js-scanner/" component={ScannerJs} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
