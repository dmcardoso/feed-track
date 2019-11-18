import React, { useState, useEffect } from 'react';
import '../assets/font/styles.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../configs/css-reset';
import Login from '../pages/login';
import api from '../services/api';
import { success } from '../components/alerts';

import AppContainer from '../components/app-container';
import Loader from '../components/loader';

const AppContext = React.createContext();

const initial_feedtrack_theme = {
    mode: 'light',
    collapsed: 'false',
};

function App() {
    let theme_mount = JSON.parse(localStorage.getItem('feedtrack_theme')) || null;

    if (theme_mount === null) {
        localStorage.setItem('feedtrack_theme', JSON.stringify(initial_feedtrack_theme));
        theme_mount = { ...initial_feedtrack_theme };
    }

    const [mode, setMode] = useState(theme_mount.mode);
    const [appUser, setAppUser] = useState(null);
    const [collapsed, setCollapsed] = useState(theme_mount.collapsed);
    const [validatingToken, setValidatingToken] = useState(true);

    useEffect(() => {
        validateToken();
    }, []);

    const changeTheme = () => {
        const theme = JSON.parse(localStorage.getItem('feedtrack_theme'));
        if (mode === 'dark') {
            localStorage.setItem('feedtrack_theme', JSON.stringify({ ...theme, mode: 'light' }));
            setMode('light');
        } else if (mode === 'light') {
            localStorage.setItem('feedtrack_theme', JSON.stringify({ ...theme, mode: 'dark' }));
            setMode('dark');
        }
    };

    const changeCollapsed = () => {
        const theme = JSON.parse(localStorage.getItem('feedtrack_theme'));
        if (collapsed === 'true') {
            localStorage.setItem('feedtrack_theme', JSON.stringify({ ...theme, collapsed: 'false' }));
            setCollapsed('false');
        } else if (collapsed === 'false') {
            localStorage.setItem('feedtrack_theme', JSON.stringify({ ...theme, collapsed: 'true' }));
            setCollapsed('true');
        }
    };

    const setUser = (user) => {
        if (user) {
            api.defaults.headers.common.Authorization = `bearer ${user.token}`;
            api.defaults.headers.user_id = user.id;
            localStorage.setItem('userKey', JSON.stringify(user));
            setAppUser(user);
            success('Bem vindo!');
        } else {
            delete api.defaults.headers.common.Authorization;
        }
    };

    async function validateToken() {
        setValidatingToken(true);

        const json = localStorage.getItem('userKey');
        const userData = JSON.parse(json);
        setUser();

        if (!userData) {
            setValidatingToken(false);
        }

        const res = await api.post('/auth/validate-token', userData);

        if (res.data) {
            setUser(userData);
            setAppUser(userData);
        } else {
            localStorage.removeItem('userKey');
        }

        setValidatingToken(false);
    }

    if (!validatingToken && !appUser) {
        return (
            <ThemeProvider theme={{ mode, collapsed }}>
                <>
                    <GlobalStyle />
                    <Login setUser={setUser} />
                </>
            </ThemeProvider>

        );
    } if (!validatingToken && appUser) {
        return (
            <AppContext.Provider value={{
                changeTheme, changeCollapsed, collapsed, appUser,
            }}
            >
                <ThemeProvider theme={{ mode, collapsed }}>
                    <>

                        <GlobalStyle />
                        <AppContainer />
                    </>
                </ThemeProvider>
            </AppContext.Provider>
        );
    }
    return (
        <>
            <GlobalStyle />
            <Loader />
        </>
    );

}

export default App;
export { AppContext };
