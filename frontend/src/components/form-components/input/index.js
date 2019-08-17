import React from 'react';
import PropTypes from 'prop-types';
import {
    StyledInput,
} from './style';

import {
    Container, Label, InputContainer, ErrorMessage, Icon,
} from '../common-style';

function Input({
    width, height, type, icon, label, error_message, name, id, margin, ...attrs
}) {
    const show_icon = icon !== null;
    const show_label = label !== null;
    const show_error = error_message !== null;

    const input_attrs = {
        name,
        id: id || name,
        show_icon,
        type,
        show_error,
        attrs: { ...attrs },
    };

    return (
        <Container width={width} margin={margin}>
            {show_label && <Label htmlFor={id || name}>{label}</Label>}
            <InputContainer height={height}>
                {show_icon && <Icon className={icon} />}
                <StyledInput
                    {...input_attrs}
                />
            </InputContainer>
            {show_error && <ErrorMessage title={error_message}>{error_message}</ErrorMessage>}
        </Container>
    );
}

Input.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    icon: PropTypes.string,
    error_message: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    margin: PropTypes.string,
    background_color: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

Input.defaultProps = {
    width: '100%',
    height: '80px',
    icon: null,
    background_color: 'transparent',
    id: null,
    margin: null,
    error_message: null,
    label: null,
};

export default Input;
