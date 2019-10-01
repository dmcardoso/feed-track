import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Filiais from '../pages/filiais';

import Filial from '../pages/filial';
import Feedback from '../pages/feedback';
import Feedbacks from '../pages/feedbacks';
import Funcionario from '../pages/funcionario';
import Funcionarios from '../pages/funcionarios';
import Home from '../pages/home';

export default props => (
    <Switch>
        <Route path="/filial/:id?" component={Filial} />
        <Route path="/filiais" component={Filiais} />
        <Route path="/feedback/:id?" component={Feedback} />
        <Route path="/feedbacks/:id?" component={Feedbacks} />
        <Route path="/funcionario/:id?" component={Funcionario} />
        <Route path="/funcionarios" component={Funcionarios} />
        <Route path="/" component={Home} />
        <Redirect from="*" to="/" />
    </Switch>
);
