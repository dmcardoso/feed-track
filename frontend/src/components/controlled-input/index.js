import React from 'react';
import Input from '../input';
import PropTypes from 'prop-types';

function ControlledInput({children, field, form, ...props}) {
    const {name, value} = field;
    console.log(children);
    console.log(field);
    console.log(form);

    const field_props = {
        width: "100%",
        height: "80px",
        margin: "0 0 21px 0",
        name,
        value,
        ...props
    };

    return (
        <Input
            {...field_props}
        />
    );
}

ControlledInput.propTypes = {};

export default ControlledInput;
