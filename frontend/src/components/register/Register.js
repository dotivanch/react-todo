import React, { Component } from "react";

import './Register.scss';
import { api, auth } from '../../models/api';
import { getTomorrow } from '../../models/date';

import showToast from '../toast/toast';

const tomorrow = getTomorrow();

const formatDate = (date) => (
    `${date.getFullYear()}-${("0"+(date.getMonth() + 1)).slice(-2)}-${("0"+date.getDate()).slice(-2)}`
);

const originalState = {
    title: '',
    description: '',
    deadline: formatDate(tomorrow),
};

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = originalState;
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleKey = (event) => {
        if(event.key === 'Enter' && event.ctrlKey)
            this.handleSubmit(undefined);
    }

    handleSubmit = (event) => {
        if(event) event.preventDefault();
        
        let timedState = this.state;
        timedState.deadline = new Date(timedState.deadline);

        api.post(
            `/api/task/${this.props.user.username}`,
            timedState,
            auth(this.props.user)
        ).then(response => {
            console.log(response);
            if(response.status === 201){
                showToast.info('task created');
                this.setState(originalState);
                this.props.fetchTasks();
            }
        }).catch(err => {
            showToast.error('error while creating task');
            console.error(err);
        });
    }

    render() {
        return (
            <div className='register'>

                <form
                    className='register-form'
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                    onKeyUp={this.handleKey}
                >
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

                    <textarea
                        name='description'
                        value={this.state.description}
                        onChange={this.handleChange}
                        placeholder='description'
                    />

                    <div>
                        <label>deadline:</label>
                        <input
                            type='date'
                            name='deadline'
                            value={this.state.deadline}
                            onChange={this.handleChange}
                        />
                    </div>

                    <input type='submit' onClick={this.handleSubmit}></input>
                </form>
            </div>
        )
    }
}