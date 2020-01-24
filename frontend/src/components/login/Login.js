import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, logout } from './LoginActions';

import api from '../../models/api';
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
        // checar se o token do usuário ainda é válido
        this.props.login('res.data.token');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let info = {
            username: this.state.username,
            password: this.state.password,
        }
        api.post('/api/login', info).then(res => {
            // faz alguma coisa aqui
        }).catch(err => {
            // manda notificação
        });
        this.props.login('res.data.token');
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
                <h1>login</h1>
                
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
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ login, logout }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);