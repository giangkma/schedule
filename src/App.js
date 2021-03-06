import React, { Component } from 'react';
import Schedule from './components/Schedule';
import Login from './components/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "./App.css";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/schedule/view" component={() => <Schedule />} />
                    <Route
                        path="/schedule"
                        exact
                        component={() => <Login />}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default App;
