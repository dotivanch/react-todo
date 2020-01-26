import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, logout } from './LoginActions';

import showToast from '../toast/toast';

import { api } from '../../models/api';
import './Login.scss';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            name: '',
            password: '',
            password2: '',
            disabled: true,
            redirect: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.isDisabled()) return;

        let info = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
        }
        api.post('/api/user/register', info).then(res => {
            console.log(res, res.status);
            if(res.status === 201){
                showToast('account created');
                this.setState({redirect: true});
            }
        }).catch(err => {
            console.log(err);
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value}, () => {
            this.setState({disabled: this.isDisabled()});
        });
    }

    isDisabled = () => {
        return  this.state.password !== this.state.password2 ||
                this.state.username.length === 0 ||
                this.state.name.length === 0;
    }

    render() {
        console.log(this.state.redirect);
        if(this.state.redirect){
            this.setState({redirect: false})
            return (
                <Redirect to='/login'/>
            )
        }

        return (
            <div id='login'>
                <div className='header'>
                    <h1>register</h1>
                    <a href='/login'>login</a>
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
                            <label>name</label>
                            <input
                                name='name'
                                type='text'
                                value={this.state.name}
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
                            <label>password again</label>
                            <input
                                name='password2'
                                type='password'
                                value={this.state.password2}
                                onChange={this.handleChange}
                            />
                        </span>

                        <span>
                            <input
                                type='submit'
                                value='register'
                                disabled={this.state.disabled ? 'disabled' : ''}
                            />
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.login.loggedIn,
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ login, logout }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Register);