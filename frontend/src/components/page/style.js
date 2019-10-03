import React from 'react';
import styled from 'styled-components';
import { parse } from '../../util/styled-components/font-size';
import { colors, textColor } from '../../configs/styled-components-options';

const Container = styled('div')`
    display: flex;
    height: auto;
    width: 100%;
`;

const Activities = styled('h3')`
    align-items: center;
    color: ${props => (props.sideActivitiesVisible ? colors.green : textColor)};
    display: flex;
    font-size: ${parse(20)};
    font-weight: bold;
    position: relative;
    
    &:hover{
        color: ${colors.green};
        cursor: pointer;
    }
`;

const IconTag = ({ className, sideActivitiesVisible, ...props }) => (
    <i className={className} {...props} />
);

const History = styled(IconTag)`
    height: 40px;
    left: -62px;
    position: absolute;
    top: 0;
    width: 45px;
    z-index: ${props => (props.z_index ? props.z_index : null)};
    
    &:hover{
        color: ${colors.green};
        cursor: pointer;
    }
    
    ::before{
        font-size: 45px;
    }
`;

const Title = styled('h1')`
    color: ${textColor};
    display: flex;
    font-size: ${parse(32)};
    font-weight: bold;
`;

export {
    Container, Activities, History, Title,
};
