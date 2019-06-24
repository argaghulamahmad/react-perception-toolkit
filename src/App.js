import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import './App.css';
import Scanner from "./components/Scanner/Scanner";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Scanner/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
