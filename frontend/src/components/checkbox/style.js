import React from 'react';
import styled from 'styled-components';
import { colors } from '../../configs/styled-components-options';
import { parse } from '../../util/styled-components/font-size';

const IconTag = props => (
    <i className={props.className} />
);

const Icon = styled(IconTag)`
    color: ${colors.white};
    height: 15px;
    left: calc(50% - (19.5px / 2));
    margin-right: 20px;
    position: absolute;
    top: calc(50% - (15px / 2));
    width: 19.5px;
    
    ::before{
        font-size: 19.5px;
    }
`;

const HiddenCheckBox = styled('input').attrs(props => ({
    type: 'checkbox',
    ...props.attrs,
}))`
    border: 0;
    overflow: hidden;
    padding: 0;
    visibility: hidden;
    position: absolute;
`;

const StyledCheckBox = styled('div')`
    appearance: none;
    background-color: ${props => (props.checked ? colors.green : colors.white)};
    border: 1px solid ${props => (props.show_error ? colors.red : 'transparent')};
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
    height: 38px;
    position: relative;
    transition: .2s;
    width: 41px;
`;

const Container = styled('div')`
    align-items: center;
    display: flex;
    height: auto;
    margin: ${props => props.margin};
    position: relative;
    width: ${props => props.width};
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

const Label = styled('label')`
    color: ${colors.black};
    font-size: ${parse(16)};
    font-weight: bold;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: fit-content;
`;


export {
    StyledCheckBox, Container, ErrorMessage, Label, HiddenCheckBox, Icon,
};
