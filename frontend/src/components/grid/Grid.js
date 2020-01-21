import React, { Component } from "react";

import './Grid.css';

import Task from '../task/Task';
import TaskDetails from '../modal/TaskDetails';
import { formatDate, getToday } from '../../models/date';

const today = formatDate(getToday());

export default class Grid extends Component {
    constructor(props){
        super(props);

        this.state = {
            enabled: -1,
        }
    }

    componentDidMount() {
        this.props.fetchTasks();
    }

    handleModal = (taskId) => {
        this.setState({enabled: taskId});
    }

    handleClose = () => {
        this.setState({enabled: -1});
        this.props.fetchTasks();
    }

    isUrgent = (deadline) => {
        return today === deadline;
    }

    render() {
        return (
            <div className='grid'>
                <TaskDetails enabled={this.state.enabled} close={this.handleClose}/>

                {this.props.data.map(x => (
                    <span className='grid-item' key={x['_id']}>
                            <Task isUrgent={this.isUrgent()} data={x} handleModal={this.handleModal}/>
                    </span>
                ))}
            </div>
        )
    }
}