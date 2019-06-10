import React, {Component} from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Scanner from '../../components/Scanner/Scanner'

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Tokopedia Home</h1>
                <NavLink to="/scanner" exact>Qr Scanner</NavLink>
                <Switch>
                    <Route path="/scanner" component={Scanner}/>
                    <Route render={() => <h1>Not found</h1>}/>
                </Switch>
            </div>
        );
    }
}

export default Home;
