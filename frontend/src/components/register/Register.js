import React, { Component } from "react";

import './Register.css';
import api from '../../models/api';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        api.post('/api/task', this.state).then(response => {
            //console.log(response);
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
                    <textarea name='description' value={this.state.description} onChange={this.handleChange}></textarea>
                    <br />

                    <input type='submit' onSubmit={this.handleSubmit}></input>
                </form>
            </div>
        )
    }
}