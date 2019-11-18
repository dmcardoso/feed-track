import styled from 'styled-components';
import React from 'react';
import { parse } from '../../../util/styled-components/font-size';
import { colors } from '../../../configs/styled-components-options';

const getBorderColor = (props) => {
    if (props.isDragReject) {
        return colors.red;
    }

    if (props.isDragActive || props.isDragAccept) {
        return colors.green;
    }

    return 'transparent';
};

const Container = styled('div')`
    align-items: center;
    background: white;
    border: 1px solid ${props => getBorderColor(props)};
    border-radius: 50%;
    box-shadow: rgba(0,0,4,.6);
    display: flex;
    height: 257px;
    justify-content: center;
    width: 257px;
    
    &:hover {
        border-color: ${colors['grey-border']};
        opacity: .8;
    }
`;

const AddPhoto = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: ${parse(18)};
    font-weight: bold;
    justify-content: center;
    text-align: center;
`;

const Image = styled('img')`
    border-radius: 50%;
    height: 100%;
    object-fit: cover;
    width: 100%;
`;

const IconTag = ({ className, cancelDatePicker, ...props }) => (
    <i className={className} {...props} />
);

const Icon = styled(IconTag)`
    color: ${props => (props.color ? props.color : colors.black)};
    display: ${props => (props.display ? props.display : 'block')};
    height: 36px;
    left: ${props => (props.position ? 'calc(50% - (45px / 2))' : 'unset')};
    margin-top: ${props => (props.position ? '0' : '10px')};
    position: ${props => (props.position ? props.position : 'unset')};
    top: ${props => (props.position ? 'calc(50% - (36px / 2))' : 'unset')};
    width: 45px;
    z-index: ${props => (props.z_index ? props.z_index : null)};
    
    ::before{
        font-size: 45px;
    }
`;

const ImageContainer = styled('div')`
    border-radius: 50%;
    height: 100%;
    position: relative;
    width: 100%;
    
    &:hover > ${Icon} {
        cursor: pointer;
        display: block;
    }
`;

export {
    Container, AddPhoto, Icon, Image, ImageContainer,
};
