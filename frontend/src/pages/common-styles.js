import styled from 'styled-components';

const FieldContainer = styled('div')`
    display: flex;
    height: auto;
    width: ${props => (props.size ? `calc(100% / ${props.size})` : '100%')};
`;

const Row = styled('div')`
    display: flex;
    height: auto;
    justify-content: ${props => (props.align ? props.align : 'space-between')};
    margin: ${props => (props.margin ? props.margin : null)};
    width: 100%;
    
    &::after {
        content: none;
    }
`;

export { FieldContainer, Row };
