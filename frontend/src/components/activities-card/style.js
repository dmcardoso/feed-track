import styled from 'styled-components';
import { parse } from '../../util/styled-components/font-size';
import { colors } from '../../configs/styled-components-options';

const Container = styled('div')`
    border-radius: 20px;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: space-between;
    margin-bottom: 20px;
    min-height: 142px;
    padding: 20px;
    width: 100%;
    
    &:last-child {
        margin: unset;
    }
`;

const Message = styled('h4')`
    color: black;
    font-size: ${parse(17)};
    font-weight: bold;
    
    a {
        color: ${colors['blue=links']};
    }
`;

const Hour = styled('time')`
    color: black;
    font-size: ${parse(16)};
    text-align: end;
    width: 100%;
`;

export { Container, Message, Hour };
