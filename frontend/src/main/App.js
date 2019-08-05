import React, { useState } from 'react';
import '../assets/font/styles.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../configs/css-reset';

import AppContainer from '../components/app-container';

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
    const [collapsed, setCollapsed] = useState(theme_mount.collapsed);

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

    return (
        <AppContext.Provider value={{ changeTheme, changeCollapsed, collapsed }}>
            <ThemeProvider theme={{ mode, collapsed }}>
                <>
                    <GlobalStyle />
                    <AppContainer />
                </>
            </ThemeProvider>
        </AppContext.Provider>
    );

    // return (
    //     <ThemeProvider theme={{ mode, collapsed }}>
    //         <>
    //             <GlobalStyle />
    //             <Login />
    //         </>
    //     </ThemeProvider>
    //
    // );
}

export default App;
export { AppContext };
