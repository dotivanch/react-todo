import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '../../App';
import Login from '../login/Login';
import { combineReducers, createStore } from "redux";
import LoginReducer from "../login/LoginReducer";

const reducers = combineReducers ({
    login: LoginReducer
});

export default (props) => (
    <Router>
        <Switch>
            <Provider store={createStore(reducers)}>
                <Route path='/todos' component={App}></Route>
                <Route path='/' component={Login}></Route>
            </Provider>
        </Switch>
    </Router>
)