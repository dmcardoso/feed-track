import styled from 'styled-components';
import { parse } from '../../util/styled-components/font-size';
import { buttonStyle } from '../../configs/styled-components-options';

const StyledButton = styled('button')`
    align-self: ${props => (props['align-self'] ? props['align-self'] : null)};
    border-radius: ${props => (props.border_radius ? props.border_radius : '40px')};
    box-shadow: 0 0 2px rgba(0,0,0,.2);
    font-size: ${parse(20)};
    font-weight: bold;
    margin: ${props => props.margin};
    ${buttonStyle};
    padding: 18px 68px;
    transition: .2s;
    width: auto;
    
    &:hover {
        cursor: pointer;
    }
`;

export { StyledButton };
