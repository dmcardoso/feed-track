import { createGlobalStyle } from 'styled-components';

const font_family = '\'Montserrat\', sans-serif';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        border: 0;
        list-style: none;
        color: inherit;
        text-decoration: none;
        outline: none;
        box-sizing: border-box;
        box-shadow: 0;
    }

    button::-moz-focus-inner,
    input[type="reset"]::-moz-focus-inner,
    input[type="button"]::-moz-focus-inner,
    input[type="submit"]::-moz-focus-inner,
    input[type="file"] > input[type="button"]::-moz-focus-inner {
        border: none;
    }
    
    :before,
    :after {
        box-sizing: border-box;
    }
    
    input:focus {
        outline: none;
    }
    
    input[type="text"],
    input[type="password"],
    textarea {
        font-family: ${font_family};
    }
    
    /*Auto clear*/
    div:after,
    header:after,
    section:after,
    article:after,
    aside:after,
    form:after,
    menu:after,
    nav:after,
    ul:after,
    ol:after,
    li:after {
        content: " ";
        display: block;
        clear: both;
        height: 0;
        overflow: hidden;
    }
    
    ::-moz-selection {
        background: #bbb;
        color: #222;
    }
    
    ::selection {
        background: #bbb;
        color: #222;
    }
    
    html {
        height: 100%;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    html {
        min-height: 100%;
        height: 100%;
        width: 100%;
    }
    
    body {
        font-family: ${font_family};
        min-height: 100%;
        overflow: auto;
        position: relative;
        font-size: 16px;
        overflow-x: hidden;
        background-color: #ffffff;
        display: flex;
        width: 100%;
        max-width: 1920px;
        height: 100%;
        margin: 0 auto;
        flex-direction: column;
    }
    
    main {
        width: 100%;
        height: 100%;
    }
    
    #root {
        height: 100%;
        width: 100%;
        display: flex;
    }
`;

export default GlobalStyle;
