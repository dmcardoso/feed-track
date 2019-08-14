import React from "react";
import styled from 'styled-components';
import { parse } from '../../util/styled-components/font-size';
import { colors } from '../../configs/styled-components-options';

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    height: auto;
    margin: ${props => props.margin};
    position: relative;
    width: ${props => props.width};
`;

const InputContainer = styled('div')`
    height: ${props => props.height};
    position: relative;
    width: 100%;
`;

const Label = styled('label')`
    font-size: ${parse(18)};
    font-weight: bold;
    margin-bottom: 5px;
`;

const ErrorMessage = styled('span')`
    bottom: -22px;
    color: ${colors.red};
    font-size: ${parse(16)};
    left: 0;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`;

const IconTag = props => (
    <i className={props.className}/>
);

const Icon = styled(IconTag)`
    color: ${colors.black};
    height: 27px;
    left: 20px;
    z-index: 2;
    margin-right: 20px;
    position: absolute;
    top: calc(50% - (27px / 2));
    width: 27px;
    
    ::before{
        font-size: 27px;
    }
`;

export {Container, Label, InputContainer, ErrorMessage, Icon};
