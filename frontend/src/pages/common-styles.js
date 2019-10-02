import styled from 'styled-components';
import { parse } from '../util/styled-components/font-size';

const FieldContainer = styled('div')`
    display: flex;
    height: auto;
    width: ${props => (props.size ? `calc(100% / ${props.size})` : '100%')};
`;

const Row = styled('div')`
    display: flex;
    height: auto;
    justify-content: ${props => (props.align ? props.align : 'space-between')};
    margin: ${props => (props.margin ? props.margin : null)};
    width: 100%;
    
    &::after {
        content: none;
    }
`;

const Subtitle = styled('h3')`
    font-size: ${parse(18)};
    margin: 15px 0 15px 0;
`;

export { FieldContainer, Row, Subtitle };
