import styled from 'styled-components';
import { colors } from '../../configs/styled-components-options';

const Container = styled('div')`
    align-items: center;
    display: flex;
    height: 50px;
    margin-left: 1px;
    margin-top: 30px;
`;

const Button = styled('div')`
    align-items: center;
    background: ${(props) => {
        if (props.disabled) {
            return '#eee;';
        }
        if (props.active) {
            return colors.green;
        }
        return colors.white;
    }};
    border-radius: 5px;
    box-shadow: 0 0 2px rgba(0, 0, 0, .2) !important;
    color: ${(props) => {
        if (props.disabled) {
            return '#9a9a9a;';
        }
        if (props.active) {
            return colors.white;
        }

        return colors.black;
    }};
    cursor: ${(props) => {
        if (props.disabled) {
            return 'not-allowed';
        }
        if (props.separator) {
            return 'normal';
        }

        return 'pointer';
    }
};
    display: flex;
    font-size: 16px;
    font-weight: bold;
    height: 45px;
    justify-content: center;
    margin-left: ${props => (props.first ? null : '5px')};
    width: 45px;
    
    &:hover {
        background: ${(props) => {
        if (props.disabled) {
            return '#eee;';
        }
        if (props.separator) {
            return null;
        }
        return colors.green;
    }};
        color: ${(props) => {
        if (props.disabled) {
            return '#9a9a9a;';
        }
        if (props.separator) {
            return null;
        }
        return colors.white;
    }};
    }
`;

export { Container, Button };
