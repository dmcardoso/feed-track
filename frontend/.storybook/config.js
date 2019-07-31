import {configure, addDecorator} from '@storybook/react';
// import requireContext from 'require-context.macro';
import '../src/assets/font/styles.css';
import '../src/assets/css/reset.css'
import {withThemesProvider} from 'storybook-addon-styled-component-theme';
import GlobalStyle from "../src/configs/css-reset";

const lightTheme = {
    name: "Light",
    mode: 'ligth'
};

const darkTheme = {
    name: "Dark",
    mode: 'dark'
};

const themes = [lightTheme, darkTheme];

const req = require.context('../src/components', true, /\.stories\.js$/);

// const req = requireContext('../src/components', true, /\.stories\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

addDecorator(withThemesProvider(themes));

configure(loadStories, module);
