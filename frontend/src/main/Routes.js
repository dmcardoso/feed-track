import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Filiais from '../pages/filiais';
import FormEdit from '../pages/filiais/form';

export default props => (
    <Switch>
        <Route path="/filial" component={FormEdit} />
        <Route path="/filiais" component={Filiais} />
        <Redirect from="*" to="/" />
    </Switch>
);
