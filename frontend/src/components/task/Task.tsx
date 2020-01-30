import React, { Component } from "react";

import './Task.scss';
import { getFormatedDate, isLate, isToday } from '../../models/date';

interface IProps {
    data: {
        _id: string,
        title: string,
        state: string,
        description: string,
        deadline: number,
        date: number
    },
    handleModal(_: string): void,
};

export default class extends Component<IProps, {}> {

    componentDidMount() {
        console.log(this.props.data);
    }

    handleShow = () => {
        this.props.handleModal(this.props.data._id);
    }

    getTaskClass = () => {
        let className = 'task';
        className += ' task-' + this.props.data.state.toLowerCase();
        className += ' ' + this.getStatus();
        return className;
    }

    getStatus = () => {
        if( this.props.data.state === 'doing' ||
            this.props.data.state === 'finish' ) return '';
        if(isToday(this.props.data.deadline)) return 'task-today';
        if(isLate(this.props.data.deadline)) return 'task-late';
        return '';
    }

    render() {
        return (
            <span className={this.getTaskClass()} onClick={this.handleShow} title={this.props.data.description}>
                <span className='task-header'>
                    {this.props.data.title}
                </span>
                
                <span className='task-date' title='created at'>
                    <i className="far fa-calendar-alt"></i>
                    {getFormatedDate(this.props.data.date)}
                </span>
                
                <br />
                
                <span className='task-date task-deadline' title='deadline'>
                    <i className="fas fa-calendar-week"></i>
                    {/*getFormatedDate(this.props.data.deadline.getDate())*/}
                </span>
            </span>
        )
    }
}