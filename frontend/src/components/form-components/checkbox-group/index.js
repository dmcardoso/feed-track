import React from 'react';
import PropTypes from 'prop-types';

import {
    Container, ErrorMessage, InputContainer, Label,
} from '../common-style';

import {
    StyledGroup, InputLabel, GroupContainer, Icon,
} from './style';

function StyledCheckBoxGroup({
    width, margin, label, error_message, name, height, value, onChange, options, ...props
}) {
    const show_label = label !== null;
    const show_error = error_message !== null;

    return (
        <Container>
            {show_label && <Label>{label}</Label>}
            <GroupContainer>
                <StyledGroup name={name} value={value} onChange={onChange}>
                    {CheckBox => (
                        <>
                            {options.map(option => (
                                <InputLabel
                                    key={option.value}
                                    checked={value.includes(option.value)}
                                    show_error={show_error}
                                >
                                    <InputContainer width="auto" margin="0 15px 0 0">
                                        <CheckBox value={option.value} />
                                        {value.includes(option.value) && <Icon className="icon-checked" />}
                                    </InputContainer>
                                    {option.label}
                                </InputLabel>
                            ))}
                        </>
                    )}
                </StyledGroup>
            </GroupContainer>
            {show_error && <ErrorMessage title={error_message}>{error_message}</ErrorMessage>}
        </Container>
    );
}

StyledCheckBoxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    icon: PropTypes.string,
    error_message: PropTypes.string,
    label: PropTypes.string,
    margin: PropTypes.string,
    background_color: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
};

StyledCheckBoxGroup.defaultProps = {
    width: '100%',
    height: 'auto',
    icon: null,
    background_color: 'white',
    margin: null,
    error_message: null,
    label: null,
    onChange: () => {},
};

export default StyledCheckBoxGroup;
