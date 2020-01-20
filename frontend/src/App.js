import React, { Component } from "react";

import Grid from './components/grid/Grid';
import Register from './components/register/Register';
import api from './models/api';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        }
    }

    fetchTasks = () => {
        api.get('/api/task').then(response => {
            this.setState({ data: response.data });
        });
    }

    render() {
        return (
            <div id='App'>
                <h1>todo list</h1>
                
                <Register fetchTasks={this.fetchTasks} />
                <Grid data={this.state.data} fetchTasks={this.fetchTasks} />
            </div>
        )
    }
}