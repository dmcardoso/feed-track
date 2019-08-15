import styled from 'styled-components';
import DatePicker from 'react-date-picker';
import React from 'react';
import { colors } from '../../../configs/styled-components-options';
import { parse } from '../../../util/styled-components/font-size';


const StyledDatePicker = styled(DatePicker)`
    background-color: ${colors.white};
    border: 1px solid ${(props => (props.show_error ? colors.red : 'transparent'))};
    border-radius: 10px;
    box-shadow: 0 0 4px rgba(0,0,0,0.2);
    font-size: ${parse(20)};
    font-weight: bold;
    height: 100%;
    width: 100%;
    
    .react-date-picker__wrapper {
        border: unset;
        height: 100%;
        width: 100%;
        
        .react-date-picker__inputGroup {
            padding: ${props => (props.show_icon ? '20px 20px 20px 62px' : '20px')};   
        }
    }
    
    .react-date-picker__calendar {
        z-index: 3;
    }
`;

export {
    StyledDatePicker,
};
