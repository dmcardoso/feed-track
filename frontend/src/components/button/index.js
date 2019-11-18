import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './style';

function Button(props) {
    const { label, ...attrs } = props;

    return (
        <StyledButton {...attrs}>{label}</StyledButton>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    kind: PropTypes.oneOf(['default', 'save', 'cancel', 'disabled']),
};

Button.defaultProps = {
    kind: 'default',
};


export default Button;
