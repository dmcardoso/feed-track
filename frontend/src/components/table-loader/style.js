import styled from 'styled-components';

const Container = styled('div')`
    align-items: center;
    background: rgba(255,255,255, .8);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    opacity: ${props => (props.loadingActive ? '1' : '0')};
    position: absolute;
    top: 0;
    width: 100%;
    z-index: ${props => (props.loadingActive ? '2' : '-1')};
`;

export { Container };
