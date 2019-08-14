import React from 'react';
import styled from 'styled-components';
import { parse } from '../../../util/styled-components/font-size';
import { colors } from '../../../configs/styled-components-options';

const StyledInput = styled('input').attrs((props => ({
    type: props.type,
    ...props.attrs,
})))`
    background-color: ${props => props.background_color};
    border-radius: 10px;
    box-shadow: 0 0 4px rgba(0,0,0,0.2);
    height: 100%;
    font-size: ${parse(20)};
    border: 1px solid ${(props => (props.show_error ? colors.red : 'transparent'))};
    font-weight: bold;
    padding: ${props => (props.show_icon ? '20px 20px 20px 62px' : '20px')};
    width: 100%;
    transition: .2s;       
    
    :focus {
        border: 1px solid ${colors.green};
        transition: .2s;       
    }
`;

const Label = styled('label')`
    font-size: ${parse(18)};
    font-weight: bold;
    margin-bottom: 5px;
`;

const InputContainer = styled('div')`
    height: ${props => props.height};
    position: relative;
    width: 100%;
`;

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    height: auto;
    margin: ${props => props.margin};
    position: relative;
    width: ${props => props.width};
`;

const IconTag = props => (
    <i className={props.className} />
);

const Icon = styled(IconTag)`
    color: ${colors.black};
    height: 27px;
    left: 20px;
    margin-right: 20px;
    position: absolute;
    top: calc(50% - (27px / 2));
    width: 27px;
    
    ::before{
        font-size: 27px;
    }
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


export {
    StyledInput, Container, Icon, InputContainer, Label, ErrorMessage,
};
