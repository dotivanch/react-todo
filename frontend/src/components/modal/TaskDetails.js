import React, { Component } from "react";
import { connect } from 'react-redux';

import './TaskDetails.scss';

import { api, auth } from '../../models/api';
import { getFormatedDate } from '../../models/date';

class TaskDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: '',
        };
    }

    componentDidUpdate(prevProps){
        if( prevProps.enabled !== this.props.enabled &&
            this.props.enabled !== -1){
            this.fetchData(this.props.enabled);
        }
    }

    fetchData(taskId) {
        api.get(`/api/task/id/${taskId}`).then(response => {
            this.setState({data: response.data});
            console.log(response.data);
        });
    }

    isEnabled() {
        return this.props.enabled !== -1;
    }

    handleChangeState = (event) => {
        api.put(
            `/api/task/${this.state.data._id}`,
            {
                state: event.target.name
            },
            auth(this.props)
        ).then(response => {
            this.fetchData(this.state.data._id);
        }).catch(err => {
            console.error(err);
        });
    }

    handleDelete = () => {
        api.delete(
            `/api/task/${this.state.data._id}`,
            auth(this.props)
        ).then(response => {
            console.log(response);
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
                        <i className={'fas fa-check-circle task-icon task-icon-' + this.state.data.state.toLowerCase()}></i>
                        <h1>{this.state.data['title']}</h1>
                        <i className={'fas fa-check-circle task-icon task-icon-' + this.state.data.state.toLowerCase()}></i>
                    </span>

                    <span className='details-description'>
                        {this.state.data['description']}
                    </span>

                    <span className='details-created'>
                        created at: <strong>{getFormatedDate(this.state.data.date)}</strong>
                    </span>

                    <span className='details-deadline'>
                        deadline at: <strong>{getFormatedDate(new Date(this.state.data.deadline))}</strong>
                    </span>

                    <div className='task-control'>
                        <h4>
                            task control
                        </h4>
                        <div>
                            <button name='unfinished' onClick={this.handleChangeState}>to do</button>
                            <button name='doing' onClick={this.handleChangeState}>doing</button>
                            <button name='finish' onClick={this.handleChangeState}>finished</button>
                            <button name='delete' onClick={this.handleDelete}>delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.login.token,
    username: state.login.username,
});

export default connect(mapStateToProps)(TaskDetails);