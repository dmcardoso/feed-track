import React from 'react';
import styled, { css } from 'styled-components';
import { parse } from '../../util/styled-components/font-size';
import { colors, textColor } from '../../configs/styled-components-options';

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
    margin: ${props => props.margin};
    position: relative;
    width: 100%;
`;

const Label = styled('label')`
    color: ${textColor};
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

const IconTag = ({ className, cancelDatePicker, ...props }) => (
    <i className={className} {...props} />
);

const Icon = styled(IconTag)`
    color: ${colors.black};
    height: 27px;
    left: 20px;
    margin-right: 20px;
    position: absolute;
    top: calc(50% - (27px / 2));
    width: 27px;
    z-index: ${props => (props.z_index ? props.z_index : 1)};
    
    ${props => (props.cancelDatePicker ? cancelDatePickerStyle : null)}
    
    ::before{
        font-size: 27px;
    }
`;

const cancelDatePickerStyle = css`
    left: unset;
    margin-right: 0;
    right: 0;
`;

export {
    Container, Label, InputContainer, ErrorMessage, Icon,
};
