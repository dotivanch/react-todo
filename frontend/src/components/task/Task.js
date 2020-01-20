import React, { Component } from "react";

import './Task.css';

const months = ['Jan', 'Fev', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export default class Task extends Component {

    getFormatedDate(seconds) {
        let date = new Date();
        date.setTime(seconds);
        return `${date.getDate()} ${months[date.getMonth()]}`;
    }

    handleShow = () => {
        this.props.handleModal(this.props.data._id);
    }

    render() {
        return (
            <span className={'task task-' + this.props.data.state.toLowerCase()} onClick={this.handleShow}>
                <span className='task-header'>{this.props.data.title}</span>
                <span className='task-date'>{this.getFormatedDate(this.props.data.date)}</span>
            </span>
        )
    }
}