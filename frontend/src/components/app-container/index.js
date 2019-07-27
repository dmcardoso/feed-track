import React from 'react';

import { Main, Container } from './style';
import Header from '../header';

function AppContainer() {
    return (
        <Container>
            <Header />
            <Main />
        </Container>
    );
}

export default AppContainer;
