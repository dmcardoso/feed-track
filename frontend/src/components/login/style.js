import styled from 'styled-components';
import { colors } from '../../configs/styled-components-options';
import logotipo from '../../assets/img/logotipo.png';

const Container = styled('div')`
    align-items: center;
    background-color: ${colors.grey};
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;
`;

const LoginContainer = styled('div')`
    align-items: center;
    background-color: ${colors.white};
    border-radius: 25px;
    box-shadow: 0 0 6px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    height: 610px;
    padding: 30px;
    width: 490px;
`;

const Logo = styled('div')`
    background: url(${logotipo}) center / cover no-repeat;
    height: 148px;
    margin-bottom: 81px;
    width: 194px;
`;

export { Container, LoginContainer, Logo };
