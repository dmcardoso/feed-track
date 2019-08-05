import styled from 'styled-components';
import {
    widthSideBar,
    backgroundColorMain,
} from '../../configs/styled-components-options';

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

export { Main, Container, MainContainer };
