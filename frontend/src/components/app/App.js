import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";

import Grid from '../grid/Grid';
import Register from '../register/Register';
import { api, auth } from '../../models/api';
import { logout } from '../login/LoginActions';

import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        }
    }

    fetchTasks = () => {
        api.get(
            `/api/task/${this.props.username}`,
            auth(this.props)
        ).then(response => {
            this.setState({ data: response.data });
        });
    }

    render() {
        if(!this.props.loggedIn)
            return (
                <Redirect to='/login' />
            )
        
        return (
            <div id='App'>
                <div className='header'>
                    <h1>todo list</h1>
                    <span className='header-name'>
                        {this.props.name}
                    </span>
                    <a href='login' onClick={this.props.logout}>logout</a>
                </div>
                
                <Register fetchTasks={this.fetchTasks} user={this.props} />
                <Grid data={this.state.data} fetchTasks={this.fetchTasks} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.login.loggedIn,
    token: state.login.token,
    username: state.login.username,
    name: state.login.name,
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ logout }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);