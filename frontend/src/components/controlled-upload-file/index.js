import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import UploadFile from '../form-components/upload-file';
import api from '../../services/api';

function ControlledUploadFile({
    children, id, field, form, onChange, onBlur, onFocus, width, height, margin, background_color, type, ...props
}) {
    const { name, value } = field;

    let image_preview = (value && typeof value === 'string') ? { preview: `${api.defaults.baseURL}images/${value}` } : value;
    image_preview = (!value) ? '' : image_preview;

    const [photo, setPhoto] = useState(image_preview);

    useEffect(() => () => {
        (window.URL ? URL : window.webkitURL).revokeObjectURL(photo.preview);
    }, [photo]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: ([acceptedFile]) => {
            if (acceptedFile) {
                setPhoto({
                    ...acceptedFile,
                    preview: (window.URL ? URL : window.webkitURL).createObjectURL(acceptedFile),
                });
                form.setFieldValue(name, acceptedFile);

                if (field.onChange) {
                    field.onChange();
                }
            }
            form.setFieldTouched(true);
        },
        multiple: false,
    });

    const removePhoto = (e) => {
        e.stopPropagation();
        form.setFieldValue(name, '');
        setPhoto('');
    };

    return (
        <UploadFile
            getRootProps={getRootProps}
            photo={photo.preview || null}
            isDragActive={isDragActive}
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
            getInputProps={getInputProps}
            removePhoto={removePhoto}
        />
    );
}

ControlledUploadFile.propTypes = {
    children: PropTypes.any,
    id: PropTypes.string,
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
};

ControlledUploadFile.defaultProps = {
    children: null,
    id: null,
    onChange: null,
    onBlur: null,
    onFocus: null,
};

export default ControlledUploadFile;
