import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from '../../App';
import Login from '../login/Login';

export default (props) => (
    <Router>
        <Switch>
            <Route path='/todos' component={App}></Route>
            <Route path='/' component={Login}></Route>
        </Switch>
    </Router>
)