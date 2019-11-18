import styled from 'styled-components';

const Container = styled('div')`
    display: flex;
    max-height: ${props => (props.isOpen ? '500px' : '0')};
    transition: max-height .4s, visibility .2s;
    width: 100%;
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
`;

export { Container };
