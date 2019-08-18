import React from 'react';
import { toast } from 'react-toastify';

const options = {
    position: 'bottom-right',
    autoClose: 4000,
    pauseOnHover: true,
    draggable: false,
};

const success = message => toast.success(message, { ...options });
const error = message => toast.error(message, { ...options });
const info = message => toast.info(message, { ...options });

export { success, error, info };
