import React from 'react';

import { Container, LoginContainer, Logo } from './style';
import Input from '../input';
import Button from '../button';
import CheckBox from '../checkbox';

function Login() {
    return (
        <Container>
            <LoginContainer>
                <Logo />
                <Input
                    width="100%"
                    height="80px"
                    type="text"
                    icon="icon-email"
                    name="email"
                    placeholder="E-mail"
                    margin="0 0 21px 0"
                />
                <Input
                    width="100%"
                    height="80px"
                    type="password"
                    icon="icon-lock"
                    name="senha"
                    placeholder="Senha"
                />
                <CheckBox
                    label="Mantenha-me conectado"
                    name="conectado"
                    value="connected"
                    margin="21px 0 0 0"
                />
                <Button
                    label="Salvar"
                    margin="15px 0 0 0"
                    align-self="flex-end"
                    kind="login"
                />
            </LoginContainer>
        </Container>
    );
}

export default Login;
