import React, { useState } from 'react';

import { Container, LoginContainer, Logo } from './style';
import Input from '../../components/form-components/input';
import Button from '../../components/button';
import CheckBox from '../../components/form-components/checkbox';
import api from '../../services/api';
import { error } from '../../components/alerts';

function Login(props) {
    const [userInfo, setUserInfo] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    async function submit() {
        try {
            const data = await api.post('auth', {
                ...userInfo,
            });
            if (data.status) {
                props.setUser(data.data);
            } else {
                error('E-mail e senha incorretos');
            }
        } catch (e) {
            error('E-mail e senha incorretos');
        }
    }

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
                    onChange={handleChange}
                    placeholder="E-mail"
                    margin="0 0 21px 0"
                />
                <Input
                    width="100%"
                    height="80px"
                    type="password"
                    onChange={handleChange}
                    icon="icon-lock"
                    name="password"
                    placeholder="Senha"
                />
                <CheckBox
                    label="Mantenha-me conectado"
                    name="conectado"
                    value="connected"
                    onChange={(e) => {
                        setUserInfo({ ...userInfo, remember: e.checked });
                    }}
                    margin="21px 0 0 0"
                />
                <Button
                    label="Salvar"
                    margin="15px 0 0 0"
                    onClick={submit}
                    align-self="flex-end"
                    kind="save"
                />
            </LoginContainer>
        </Container>
    );
}

export default Login;
