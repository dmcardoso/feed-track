import React from 'react';
import styled from 'styled-components';
import { backgroundColor, colors, textColor } from '../../configs/styled-components-options';

const StyledHeader = styled('header')`
    align-items: center;
    background-color: ${backgroundColor};
    display: flex;
    height: 100px;
    padding: 0 25px 0 60px;
    width: 100%;
`;

const IconTag = (props) => {
    const { className, ...attrs } = props;

    return (
        <div className={className} {...attrs} />
    );
};

const Icon = styled(IconTag)`
    color: ${textColor};
    height: 45px;
    margin-left: 20px;
    width: 45px;
    
    &::before{
        font-size: 45px;
    }
`;


export { StyledHeader, Icon };
