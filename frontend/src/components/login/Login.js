import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, logout } from './LoginActions';

import showToast from '../toast/toast';

import { api } from '../../models/api';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    componentDidMount() {
        let storedInfo = localStorage.getItem('@todoapp/login');
        storedInfo = JSON.parse(storedInfo);

        if(storedInfo && storedInfo.token){
            api.post('/api/user/auth', storedInfo).then(res => {
                this.props.login(storedInfo.token, storedInfo.username, storedInfo.name);
                showToast.info('successfully logged in');
            }).catch(err => {
                // perform a complete logout
                this.props.logout();
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let info = {
            username: this.state.username,
            password: this.state.password,
        }
        api.post('/api/user/login', info).then(res => {
            this.props.login(res.data.token, res.data.username, res.data.name);
            showToast.info('successfully logged in');
        }).catch(err => {
            if(err.response.status === 401) showToast.error('invalid name/password');
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        if(this.props.loggedIn){
            return (
                <Redirect to='/todos'/>
            )
        }

        return (
            <div id='login'>
                <div className='header'>
                    <h1>login</h1>
                    <a href='/register'>register</a>
                </div>
                
                <form
                    autoComplete='false'
                    onSubmit={this.handleSubmit}
                >
                    <div id='login-content'>
                        <span>
                            <label>username</label>
                            <input
                                name='username'
                                type='text'
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </span>

                        <span>
                            <label>password</label>
                            <input
                                name='password'
                                type='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </span>

                        <span>
                            <input type='submit' value='login'></input>
                        </span>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.login.loggedIn,
    token: state.login.token,
    username: state.login.username,
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ login, logout }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);