import React, { Component } from "react";

import './Register.css';
import api from '../../models/api';

const originalState = {
    title: '',
    description: '',
};

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = originalState;
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        api.post('/api/task', this.state).then(response => {
            if(response.status === 201){
                this.setState(originalState);
            }
        });
    }

    render() {
        return (
            <div className='register'>
                <span className='register-header'>
                    add task
                </span>

                <form onSubmit={this.handleSubmit}>
                    title:
                    <input type='text' name='title' value={this.state.title} onChange={this.handleChange}></input>
                    <br />

                    description:
                    <input type='text' name='description' value={this.state.description} onChange={this.handleChange}></input>
                    <br />

                    <input type='submit' onClick={this.handleSubmit}></input>
                </form>
            </div>
        )
    }
}