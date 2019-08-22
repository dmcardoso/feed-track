import React from 'react';
import { confirmAlert as confirmAlertLib } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const confirmAlert = ({ title, message, buttons }) => confirmAlertLib({
    title,
    message,
    buttons,
});

export { confirmAlert };
