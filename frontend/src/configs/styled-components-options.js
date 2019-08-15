import theme from 'styled-theming';
import { css } from 'styled-components';

const colors = {
    black: '#000',
    green: '#5EC394',
    grey: '#F5F6FA',
    'grey-border': '#707070',
    'grey-even-table': '#F8F8F8',
    'blue-dark': '#2B3252',
    red: '#BF3E3E',
    'blue=links': '#2929C6',
    white: '#fff',
    'grey-dark': '#3A3D4D',
};

const backgroundColor = theme('mode', {
    light: colors.white,
    dark: colors['blue-dark'],
});

const backgroundColorMain = theme('mode', {
    light: colors.grey,
    dark: colors['grey-dark'],
});

const textColor = theme('mode', {
    light: colors.dark,
    dark: colors.white,
});

const widthSideBar = theme('collapsed', {
    true: '125px',
    false: '445px',
});

const marginBottomCollapsedSideBar = theme('collapsed', {
    true: '159px',
    false: '0',
});

const buttonStyle = theme.variants('mode', 'kind', {
    default: {
        light: css`
            background-color: ${colors.white};
            color: ${colors.black};
            
            &:hover {
                background-color: ${colors.green};
                color: ${colors.white};
            }
        `,
        dark: '#123456',
    },
    save: {
        light: css`
            background-color: ${colors.white};
            color: ${colors.black};
            
            &:hover {
                background-color: ${colors.green};
                color: ${colors.white};
            }
        `,
        dark: '#123456',
    },
    cancel: {
        light: css`
            background-color: ${colors.white};
            color: ${colors.red};
            
            &:hover {
                background-color: ${colors.red};
                color: ${colors.white};
            }
        `,
        dark: '#123456',
    },
    disabled: {
        light: css`
            background-color: #F4F3F3;    
            color: #9D9D9D;
            
            &:hover{
                cursor: unset;
            }
        `,
        dark: css`
            background-color: #F4F3F3;    
            color: #9D9D9D;
            
            &:hover{
                cursor: unset;
            }
        `,
    },
    login: {
        light: css`
            background-color: ${colors.white};
            color: ${colors.black};
            
            &:hover {
                background-color: ${colors.green};
                color: ${colors.white};
            }
        `,
        dark: css`
            background-color: ${colors.white};
            color: ${colors.black};
            
            &:hover {
                background-color: ${colors.green};
                color: ${colors.white};
            }
        `,
    },
});


export {
    backgroundColor, textColor, widthSideBar, marginBottomCollapsedSideBar, backgroundColorMain, buttonStyle, colors,
};
