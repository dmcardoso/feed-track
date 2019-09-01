import React from 'react';
import PropTypes from 'prop-types';
import { Container, Message, Hour } from './style';

function ActivitiesCard({ message, hour }) {
    return (
        <Container>
            <Message>{message}</Message>
            <Hour>{hour}</Hour>
        </Container>
    );
}

ActivitiesCard.propTypes = {
    message: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
};

export default ActivitiesCard;
