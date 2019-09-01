import React from 'react';
import styled from 'styled-components';
import { colors } from '../../configs/styled-components-options';

const Container = styled('div')`
    align-self: flex-end;
    background: white;
    display: flex;
    height: calc(100% - 30px);
    overflow: hidden;
    position: relative;
    transition: .4s;
    width: ${props => (props.sideActivitiesVisible ? '510px' : 0)};
`;

const InsideContainer = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 47px 40px;
    width: 100%;
`;

const IconTag = ({ className, sideActivitiesVisible, ...props }) => (
    <i className={className} {...props} />
);

const Close = styled(IconTag)`
    color: ${colors.black};
    display: ${props => (props.sideActivitiesVisible ? 'block' : 'none')};
    height: 22px;
    position: absolute;
    right: 12px;
    top: 12px;
    width: 22px;
    z-index: ${props => (props.z_index ? props.z_index : null)};
    
    &:hover{
        color: ${colors.green};
        cursor: pointer;
    }
    
    ::before{
        font-size: 22px;
    }
`;

export { Container, Close, InsideContainer };
