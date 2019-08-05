import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Filiais from '../pages/filiais';

export default props => (
    <Switch>
        <Route path="/filiais" component={Filiais} />
        <Redirect from="*" to="/" />
    </Switch>
);
