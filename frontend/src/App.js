import React, { Component } from "react";

import Grid from './components/grid/Grid';
import Register from './components/register/Register';

export default class App extends Component {
    render() {
        return (
            <div id='App'>
                <h1>todo list</h1>
                
                <Register />
                <Grid />
            </div>
        )
    }
}