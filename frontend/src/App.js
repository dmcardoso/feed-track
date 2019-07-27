import React, { useState } from 'react';
import './assets/font/styles.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './configs/css-reset';

// import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/sidebar';
import AppContainer from './components/app-container';

// import Routes from './Routes';
import Login from './components/login';

const AppContext = React.createContext();

function App() {
    const mount_mode = localStorage.getItem('mode');
    const mount_collapsed = localStorage.getItem('collapsed');

    if (mount_mode === null) {
        localStorage.setItem('mode', 'light');
    }

    if (mount_collapsed === null) {
        localStorage.setItem('collapsed', 'false');
    }

    const [mode, setMode] = useState(mount_mode || 'light');
    const [collapsed, setCollapsed] = useState(mount_collapsed || 'false');

    const changeTheme = () => {
        if (mode === 'dark') {
            localStorage.setItem('mode', 'light');
            setMode('light');
        } else if (mode === 'light') {
            localStorage.setItem('mode', 'dark');
            setMode('dark');
        }
    };

    const changeCollapsed = () => {
        if (collapsed === 'true') {
            localStorage.setItem('collapsed', 'false');
            setCollapsed('false');
        } else if (collapsed === 'false') {
            localStorage.setItem('collapsed', 'true');
            setCollapsed('true');
        }
    };

    return (
        <AppContext.Provider value={{ changeTheme }}>
            <ThemeProvider theme={{ mode, collapsed }}>
                <>
                    <GlobalStyle />
                    <Sidebar changeCollapsed={changeCollapsed} collapsed={collapsed} />
                    <AppContainer />
                </>
            </ThemeProvider>z
        </AppContext.Provider>
    );

    return (
        <ThemeProvider theme={{ mode, collapsed }}>
            <>
                <GlobalStyle />
                <Login />
            </>
        </ThemeProvider>

    );
}

export default App;
export { AppContext };
