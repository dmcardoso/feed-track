import React from 'react';
import PropTypes from 'prop-types';
import Input from '../form-components/input';

function ControlledInput({
    children, id, field, form, onChange, onBlur, width, height, margin, background_color, ...props
}) {
    const { name, value } = field;
    const { errors } = form;

    const general_events = {
        onChange(event) {
            if (onChange) {
                onChange(event);
            }

            if (field.onChange) {
                field.onChange(event);
            }
        },
        onBlur(event) {
            if (onBlur) {
                onBlur(event);
            }

            if (field.onBlur) {
                field.onBlur(event);
            }
        },
    };

    const field_props = {
        width,
        height,
        margin,
        name,
        value,
        id,
        background_color,
        ...props,
        ...general_events,
    };

    if (errors[name]) {
        field_props.error_message = errors[name];
    }

    return (
        <Input
            {...field_props}
        />
    );
}

ControlledInput.propTypes = {
    children: PropTypes.any,
    id: PropTypes.string,
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    background_color: PropTypes.string,
};

ControlledInput.defaultProps = {
    children: null,
    id: null,
    onChange: null,
    onBlur: null,
    width: '100%',
    height: '60px',
    margin: '0 0 21px 0',
    background_color: 'white',
};


export default ControlledInput;
