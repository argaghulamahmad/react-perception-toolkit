import React, {Component} from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';

import './App.css';
import Scanner from "./components/Scanner/Scanner";
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
                                <Link to="/scanner/">Scanner</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={Home} />
                    <Route path="/scanner/" component={Scanner} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
