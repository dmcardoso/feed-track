import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Container } from './style';
import Header from '../header';
import Routes from '../../main/Routes';
import Sidebar from '../sidebar';

function AppContainer() {
    return (
        <BrowserRouter>
            <Sidebar />
            <Container>
                <Header />
                <Routes />
            </Container>
        </BrowserRouter>
    );
}

export default AppContainer;
