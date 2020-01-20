import React, { Component } from "react";

import './TaskDetails.css';

import api from '../../models/api';

export default class TaskDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidUpdate(prevProps){
        if( prevProps.enabled !== this.props.enabled &&
            this.props.enabled !== -1){
            this.fetchData(this.props.enabled);
        }
    }

    fetchData(taskId) {
        api.get(`/api/task/${taskId}`).then(response => {
            this.setState({data: response.data});
            console.log(response.data);
        });
    }

    isEnabled() {
        return this.props.enabled !== -1;
    }

    getFormattedDate() {
        var d = new Date(Number(this.state.data['date']));
        return d.toLocaleString();
    }

    handleChangeState = (event) => {
        api.put(`/api/task/${this.state.data._id}`, {
            state: event.target.name.toUpperCase()
        }).then(response => {
            this.fetchData(response.data['_id']);
        });
    }

    handleDelete = () => {
        api.delete(`/api/task/${this.state.data._id}`).then(response => {
            this.props.close();
        });
    }

    render() {
        if(!this.isEnabled() || this.state.data.length === 0) return null;

        return (
            <div className='task-details'>
                <div className='details-background' onClick={() => this.props.close()}></div>
                <div className='details-content'>

                    <i className='fas fa-times details-close' onClick={() => this.props.close()}></i>

                    <span className='details-header'>
                        <i className={'fas fa-check-circle task-' + this.state.data.state.toLowerCase()}></i>
                        <h1>{this.state.data['title']}</h1>
                    </span>

                    <span>
                        {this.state.data['description']}
                    </span>

                    <span>
                        created at: {this.getFormattedDate()}
                    </span>

                    <div className='task-control'>
                        <button name='finish' onClick={this.handleChangeState}>finish</button>
                        <button name='doing' onClick={this.handleChangeState}>doing</button>
                        <button name='unfinished' onClick={this.handleChangeState}>to do</button>
                        <button name='delete' onClick={this.handleDelete}>delete</button>
                    </div>
                </div>
            </div>
        )
    }
}