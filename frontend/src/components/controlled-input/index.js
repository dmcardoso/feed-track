import React from 'react';
import PropTypes from 'prop-types';
import Input from '../form-components/input';
import DatePicker from '../form-components/date-picker';
import Select from '../form-components/select';
import StyledRadioGroup from '../form-components/styled-radio-group';
import StyledCheckBoxGroup from '../form-components/checkbox-group';

function ControlledInput({
    children,
    id,
    field,
    form,
    onChange,
    onBlur,
    onFocus,
    width,
    height,
    margin,
    background_color,
    type,
    options,
    ...props
}) {
    const { name, value } = field;
    const { errors, touched } = form;

    const general_events = {
        onChange(event) {
            if (onChange) {
                onChange(event);
            }

            if (field.onChange) {
                field.onChange(event);
            }

            if (type === 'date'
                || type === 'select'
                || type === 'input_radio'
                || type === 'input_checkbox') form.setFieldValue(name, event);
        },
        onBlur(event) {
            if (onBlur) {
                onBlur(event);
            }

            if (field.onBlur) {
                field.onBlur(event);
            }

            if (type === 'date'
                || type === 'select'
                || type === 'input_radio'
                || type === 'input_checkbox') form.setFieldTouched(field.name, true);
        },
        onFocus(event) {
            if (onFocus) {
                onFocus(event);
            }

            if (field.onFocus) {
                field.onFocus(event);
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

    if (type !== 'date' && type !== 'input_radio' && type !== 'input_checkbox') {
        field_props.type = type;
    }

    if (type === 'input_radio' || type === 'input_checkbox') {
        field_props.options = options;
    }

    return (
        <>
            {(() => {
                if (type === 'date') {
                    return (
                        <DatePicker
                            {...field_props}
                        />
                    );
                }

                if (type === 'input_radio') {
                    return (
                        <StyledRadioGroup
                            {...field_props}
                        />
                    );
                }

                if (type === 'input_checkbox') {
                    return (
                        <StyledCheckBoxGroup
                            {...field_props}
                        />
                    );
                }

                if (type === 'select') {
                    return (
                        <Select
                            {...field_props}
                        />
                    );
                }

                return (
                    <Input
                        {...field_props}
                    />
                );
            })()}
        </>
    );
}

ControlledInput.propTypes = {
    children: PropTypes.any,
    id: PropTypes.string,
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    type: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    options: PropTypes.array,
    background_color: PropTypes.string,
};

ControlledInput.defaultProps = {
    children: null,
    id: null,
    onChange: null,
    onBlur: null,
    onFocus: null,
    width: '100%',
    height: '60px',
    options: [],
    type: 'text',
    margin: '0 0 31px 0',
    background_color: 'white',
};


export default ControlledInput;
