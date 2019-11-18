import styled from 'styled-components';

const Card = styled('div')`
    background-color: white;
    border-radius: 13px;
    display: flex;
    height: ${props => (props.height ? props.height : 'auto')};
    justify-content: space-between;
    padding: 15px 15px 20px 15px;
    width: ${props => (props.width ? props.width : 'auto')};
    ${props => (props.margin ? `margin: ${props.margin};` : null)}
`;

const Title = styled('h2')`
    color: black;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-left: 10px;
`;

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    height: auto;
    width: ${props => (props.width ? props.width : 'auto')};
`;

export { Card, Title, Container };
