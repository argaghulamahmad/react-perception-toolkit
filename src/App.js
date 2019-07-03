import React, {Component} from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';

import './App.css';
import Scanner from "./components/Scanner/Scanner";
import Home from "./components/Home/Home";
import Benchmark from "./components/Benchmark/Benchmark";

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
                                <Link to="/scanner/">Scanner</Link>
                            </li>
                            <li>
                                <Link to="/benchmark/">Benchmark</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={Home} />
                    <Route path="/scanner/" component={Scanner} />
                    <Route path="/benchmark/" component={Benchmark} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
