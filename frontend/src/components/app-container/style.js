import styled from 'styled-components';
import {
    widthSideBar,
    backgroundColorMain,
} from '../../configs/styled-components-options';
import { parse } from '../../util/styled-components/font-size';

const Main = styled('main')`
    background-color: ${backgroundColorMain};
    display: flex;
    height: calc(100vh - 100px);
    overflow-y: auto;
    width: 100%;
`;

const MainContainer = styled('div')`
    height: 100%;
    padding: 59px;
    width: 100%;
`;

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    transition: .2s;
    width: calc(100% - ${widthSideBar});
`;

const LoadContainer = styled('div')`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
`;

const Title = styled('h1')`
    display: flex;
    font-size: ${parse(32)};
    font-weight: bold;
    margin-bottom: 50px;
`;

export {
    Main, Container, MainContainer, Title, LoadContainer
};
