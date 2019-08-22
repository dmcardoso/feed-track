import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';
import { Main, MainContainer, Title } from '../app-container/style';

function Page({ children, title }) {
    return (
        <Container>
            <Main>
                <MainContainer>
                    <Title>{title}</Title>
                    {children}
                </MainContainer>
            </Main>
        </Container>
    );
}

Page.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string.isRequired,
};

export default Page;
