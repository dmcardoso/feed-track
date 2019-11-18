import React, { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Container } from './style';
import Header from '../header';
import Routes from '../../main/Routes';
import Sidebar from '../sidebar';

const AppContainerContext = createContext();

function AppContainer() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <BrowserRouter>
            <AppContainerContext.Provider value={{ setLoading, loading, activities, setActivities }}>
                <>
                    <Sidebar />
                    <Container>
                        <Header />
                        <Routes />
                    </Container>
                </>
            </AppContainerContext.Provider>
        </BrowserRouter>
    );
}

export default AppContainer;
export { AppContainerContext };
