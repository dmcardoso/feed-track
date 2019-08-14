import React from 'react';
import PropTypes from 'prop-types';
import {
    StyledDatePicker, Container, Label, InputContainer, ErrorMessage, Icon
} from './style';

function DatePicker({
    width, height, icon, label, error_message, name, id, margin, ...attrs
}) {
    const show_icon = icon !== null;
    const show_label = label !== null;
    const show_error = error_message !== null;

    console.log(icon);

    return (
        <Container width={width} margin={margin}>
            {show_label && <Label htmlFor={id || name}>{label}</Label>}
            <InputContainer height={height}>
                {show_icon && <Icon className={icon} />}
                <StyledDatePicker {...attrs} />
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
    icon: null,
    id: null,
    margin: null,
    error_message: null,
    label: null,
};


export default DatePicker;
