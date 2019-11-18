import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

function TogglableContent({ isOpen, children }) {
    return (
        <Container isOpen={isOpen}>
            {isOpen && children}
        </Container>
    );
}

TogglableContent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default TogglableContent;
