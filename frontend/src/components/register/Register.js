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
                this.props.fetchTasks();
            }
        });
    }

    render() {
        return (
            <div className='register'>

                <form className='register-form' onSubmit={this.handleSubmit}>
                    <span className='register-header'>
                        add task
                    </span>

                    <input
                        type='text'
                        name='title'
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder='title'
                    />

                    <input
                        type='text'
                        name='description'
                        value={this.state.description}
                        onChange={this.handleChange}
                        placeholder='description'
                    />

                    <input type='submit' onClick={this.handleSubmit}></input>
                </form>
            </div>
        )
    }
}