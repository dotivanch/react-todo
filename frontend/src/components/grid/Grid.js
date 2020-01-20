import React, { Component } from "react";

import './Grid.css';

import Task from '../task/Task';
import TaskDetails from '../modal/TaskDetails';
import api from '../../models/api';

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

    render() {
        return (
            <div className='grid'>
                <TaskDetails enabled={this.state.enabled} close={this.handleClose}/>

                <div className='grid-item'>
                    {this.props.data.map(x => (
                        <Task key={x['_id']} data={x} handleModal={this.handleModal}/>
                    ))}
                </div>
            </div>
        )
    }
}