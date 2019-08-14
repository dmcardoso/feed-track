import React from 'react';
import DatePicker from "../form-components/date-picker";
import PropTypes from "prop-types";

function ControlledDatePicker({
                                  children, id, field, form, onChange, onBlur, width, height, margin, background_color, ...props
                              }) {
    const {name, value} = field;
    const {errors, touched} = form;

    const general_events = {
        onChange(event) {
            if (onChange) {
                onChange(event);
            }

            if (field.onChange) {
                field.onChange(event);
            }

            if(event) form.setFieldValue(name, event);
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

    if (errors[name] && touched[name]) {
        field_props.error_message = errors[name];
    }

    return (
        <DatePicker
            {...field_props}
        />
    );
}

ControlledDatePicker.propTypes = {
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

ControlledDatePicker.defaultProps = {
    children: null,
    id: null,
    onChange: null,
    onBlur: null,
    width: '100%',
    height: '60px',
    margin: '0 0 21px 0',
    background_color: 'white',
};

export default ControlledDatePicker;
