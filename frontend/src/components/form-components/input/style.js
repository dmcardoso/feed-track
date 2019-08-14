import React from 'react';
import styled from 'styled-components';
import { parse } from '../../../util/styled-components/font-size';
import { colors } from '../../../configs/styled-components-options';

const StyledInput = styled('input').attrs((props => ({
    type: props.type,
    ...props.attrs,
})))`
    background-color: ${props => props.background_color};
    border-radius: 10px;
    box-shadow: 0 0 4px rgba(0,0,0,0.2);
    height: 100%;
    font-size: ${parse(20)};
    border: 1px solid ${(props => (props.show_error ? colors.red : 'transparent'))};
    font-weight: bold;
    padding: ${props => (props.show_icon ? '20px 20px 20px 62px' : '20px')};
    width: 100%;
    transition: .2s;
    
    :focus {
        border: 1px solid ${colors.green};
        transition: .2s;       
    }
`;

export {
    StyledInput
};
