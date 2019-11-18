import React from 'react';
import cogoToast from 'cogo-toast';

const options = {
    position: 'bottom-right',
    hideAfter: 4,
    onClick: hide => {
        hide();
    },
};

const success = (message = '', body = '') => cogoToast.success(body, {...options, heading: message});
const info = (message = '', body = '') => cogoToast.info(body, {...options, heading: message});
const loading = (message = '', body = '') => cogoToast.loading(body, {...options, heading: message, hideAfter: 0});
const warn = (message = '', body = '') => cogoToast.warn(body, {...options, heading: message});
const error = (message = '', body = '') => cogoToast.error(body, {...options, heading: message});

export {success, error, info, loading, warn};
