import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from "redux";

import App from '../app/App';
import Login from '../login/Login';
import LoginReducer from "../login/LoginReducer";
import Register from "../login/Register";

const reducers = combineReducers ({
    login: LoginReducer
});

export default (props) => (
    <Router>
        <Switch>
            <Provider store={createStore(reducers)}>
                <Route path='/todos' component={App}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/' exact={true} component={App}></Route>
            </Provider>
        </Switch>
    </Router>
)