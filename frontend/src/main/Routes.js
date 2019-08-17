import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Filiais from '../pages/filiais';

import Filial from '../pages/filial';
import Feedback from '../pages/feedback';

export default props => (
    <Switch>
        <Route path="/filial" component={Filial} />
        <Route path="/filiais" component={Filiais} />
        <Route path="/feedback/:id?" component={Feedback} />
        <Redirect from="*" to="/" />
    </Switch>
);
