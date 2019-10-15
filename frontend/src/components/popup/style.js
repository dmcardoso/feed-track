import styled, { createGlobalStyle } from 'styled-components';
import Popup from 'reactjs-popup';
import { parse } from '../../util/styled-components/font-size';

const StyledPopup = styled(Popup)`
    height: auto;    
`;

const GlobalStyle = createGlobalStyle`
    .popup-content {
        border-radius: 13px;
        height: auto;    
        font-size: ${parse(16)};
        padding: 15px !important;
    }
`;

const Header = styled('h2')`
    border-bottom: 1px solid #ebebeb;
    font-size: ${parse(18)};
    font-weight: bold;
    margin-bottom: 5px;
    padding-bottom: 5px;
`;

const Close = styled('div')`
    background: #ffffff;
    border: 1px solid #cfcece;
    border-radius: 18px;
    cursor: pointer;
    display: block;
    font-size: 24px;
    line-height: 20px;
    padding: 2px 5px;
    position: absolute;
    right: -10px;
    top: -10px;
`;

const Container = styled('div')`
    display: flex;
    flex-wrap: wrap;
    height: auto;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
`;

export {
    StyledPopup, Close, Container, Header, GlobalStyle,
};
