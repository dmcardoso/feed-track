import styled from 'styled-components';
import {
    widthSideBar,
    backgroundColorMain, colors,
} from '../../configs/styled-components-options';
import { parse } from '../../util/styled-components/font-size';

const Main = styled('main')`
    background-color: ${backgroundColorMain};
    display: flex;
    height: auto;
    width: 100%;
`;

const MainContainer = styled('div')`
    display: flex;
    height: 100%;
    padding: 59px;
    transition: .4s;
    width: ${props => (props.sideActivitiesVisible ? 'calc(100% - 510px)' : '100%')};
`;

const Container = styled('div')`
    background-color: ${colors.grey};
    display: flex;
    flex-direction: column;
    overflow: auto;
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

const Column = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Row = styled('div')`
    display: flex;
    margin: ${props => (props.margin ? props.margin : '')};
    width: 100%;
`;

const RowSpaceBetween = styled(Row)`
    justify-content: space-between;
`;

export {
    Main, Container, MainContainer, LoadContainer, Column, Row, RowSpaceBetween,
};
