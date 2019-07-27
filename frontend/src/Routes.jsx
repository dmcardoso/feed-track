import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Login from './components/login';

export default props => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect from="*" to="/" />
    </Switch>
);
