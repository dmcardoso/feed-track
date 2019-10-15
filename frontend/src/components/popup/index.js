import React from 'react';
import PropTypes from 'prop-types';
import {
    StyledPopup, Close, Container, Header, GlobalStyle,
} from './style';

function Popup({ children, closeEvent, header, ...props }) {
    return (
        <StyledPopup
            {...props}
        >
            <>
                <GlobalStyle />
                <Close onClick={(e) => {
                    if (closeEvent) {
                        closeEvent(e);
                    }
                }}
                >
X
                </Close>
                <Header>{header}</Header>
                <Container>
                    {children}
                </Container>
            </>
        </StyledPopup>
    );
}

Popup.propTypes = {
    closeEvent: PropTypes.func,
    header: PropTypes.string.isRequired,
};


export default Popup;
