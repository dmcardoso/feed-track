import React from 'react';
import PropTypes from 'prop-types';
import {
    StyledDatePicker
} from './style';
import {Container, Label, InputContainer, ErrorMessage, Icon} from '../common-style.js';

function DatePicker({
                        width, height, icon, label, error_message, name, id, margin, ...attrs
                    }) {
    const show_icon = icon !== null;
    const show_label = label !== null;
    const show_error = error_message !== null;

    const input_attrs = {
        name,
        id: id || name,
        show_icon,
        show_error,
        format:"dd/MM/yy",
        calendarIcon:null,
        clearIcon:null,
        ...attrs,
    };

    return (
        <Container width={width} margin={margin}>
            {show_label && <Label htmlFor={id || name}>{label}</Label>}
            <InputContainer height={height}>
                {show_icon && <Icon className={icon}/>}
                <StyledDatePicker {...input_attrs}/>
            </InputContainer>
            {show_error && <ErrorMessage title={error_message}>{error_message}</ErrorMessage>}
        </Container>
    );
}

DatePicker.propTypes = {
    width: PropTypes.string,
    icon: PropTypes.string,
    error_message: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    margin: PropTypes.string,
    name: PropTypes.string.isRequired,
};

DatePicker.defaultProps = {
    width: '100%',
    height: '60px',
    icon: 'icon-calendar',
    id: null,
    margin: null,
    error_message: null,
    label: null,
};


export default DatePicker;
