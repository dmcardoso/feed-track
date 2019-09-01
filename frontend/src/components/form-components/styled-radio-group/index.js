import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Container, ErrorMessage, InputContainer, Label,
} from '../common-style';
import {
    StyledGroup, StyledRadio, Icon, InputLabel,
} from './style';


function StyledRadioGroup({
    width, margin, label, error_message, name, id, height, value, onChange, options, ...props
}) {
    // const [selectedValue, setSelectedValue] = useState(value);
    const show_label = label !== null;
    const show_error = error_message !== null;

    const input_attrs = {
        name,
        id: id || name,
    };

    if (show_error) {
        input_attrs.show_error = show_error;
    }

    const changeEvents = (e) => {
        if (onChange) {
            onChange(e);
        }
        // setSelectedValue(e);
    };

    return (
        <Container width={width} margin={margin}>
            {show_label && <Label>{label}</Label>}
            <StyledGroup
                name={name}
                selectedValue={value}
                onChange={e => changeEvents(e)}
            >
                {options.map(input => (
                    <InputLabel key={input.value} margin="0 15px 0 0">
                        <InputContainer height={height} margin="0 10px 0 0">
                            <StyledRadio value={input.value} {...input_attrs} checked={value === input.value} />
                            {value === input.value && <Icon className="icon-checked" />}
                        </InputContainer>
                        {input.label}
                    </InputLabel>
                ))}
            </StyledGroup>
            {show_error && <ErrorMessage title={error_message}>{error_message}</ErrorMessage>}
        </Container>

    );
}

StyledRadioGroup.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    icon: PropTypes.string,
    error_message: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    margin: PropTypes.string,
    background_color: PropTypes.string,
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

StyledRadioGroup.defaultProps = {
    width: '100%',
    height: 'auto',
    icon: null,
    background_color: 'white',
    id: null,
    margin: null,
    error_message: null,
    label: null,
    value: null,
    onChange: () => {},
};

export default StyledRadioGroup;
