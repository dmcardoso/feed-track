import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, AddPhoto, Icon, Image, ImageContainer,
} from './style';
import { colors } from '../../../configs/styled-components-options';

function UploadFile({
    getRootProps, getInputProps, photo, removePhoto, isDragActive, isDragAccept, isDragReject, ...attrs
}) {
    return (
        <Container
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
        >
            <input {...getInputProps()} />
            {
                photo
                    ? (
                        <ImageContainer>
                            <Icon
                                className="icon-cancel"
                                position="absolute"
                                color={colors.white}
                                onClick={e => removePhoto(e)}
                                display="none"
                            />
                            <Image src={photo} alt="Oloco" />
                        </ImageContainer>
                    )
                    : (
                        <AddPhoto>
                            {(() => {
                                if (isDragReject) {
                                    return 'Arquivo inválido!';
                                }

                                if (isDragActive) {
                                    return 'Solte a foto aqui!';
                                }

                                return (
                                    <>
                                        Adicionar Foto
                                        <Icon className="icon-photo" />
                                    </>
                                );
                            })()}
                        </AddPhoto>
                    )
            }
        </Container>
    );
}

UploadFile.propTypes = {
    getRootProps: PropTypes.func,
    getInputProps: PropTypes.func,
    removePhoto: PropTypes.func,
    isDragActive: PropTypes.bool,
    isDragAccept: PropTypes.bool,
    isDragReject: PropTypes.bool,
    photo: PropTypes.string,
};

UploadFile.defaultProps = {
    getRootProps: () => {
    },
    getInputProps: () => {
    },
    removePhoto: () => {
    },
    photo: null,
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
};

export default UploadFile;
