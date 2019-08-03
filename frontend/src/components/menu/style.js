import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { parse } from '../../util/styled-components/font-size';
import { textColor, colors } from '../../configs/styled-components-options';


const IconTag = ({ className, icon, ...props }) => (
    <div className={className} {...props} />
);

const List = styled('ul')`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    li {
        margin-bottom: 15px;
        
        :last-child {
            margin-bottom: 0;
        }
    }
`;

const Item = styled('li')`
    ${props => (props.circle ? circle : item_style)}
    
    
    &:hover {
        > a,
        > [class^='icon-'] {
            color: ${props => (props.hover_color ? props.hover_color : colors.green)};    
        }
    }
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const item_style = css`
    align-items: center;
    border-bottom-width: ${props => (props.borderBottom ? `${props.borderBottom}px` : '0')};
    border-color: ${textColor};
    border-style: ${
    props => (props.borderBottom ? 'solid' : null)};
    display: flex;
    height: ${props => (props.icon ? (props.height ? props.height : '45px') : 'auto')};
    margin-bottom: ${props => ((props.marginBottom) ? `${props.marginBottom}px` : '0')};
    padding-bottom: ${props => (props.borderBottom ? '37.5px' : '0')};
    position: relative;
    width: fit-content;
`;

const Icon = styled(IconTag)`
    color: ${textColor};
    height: ${props => (props.width ? `${props.width}px` : '45px')};
    margin-right: ${props => (props.margin_right ? `${props.margin_right}px` : '20px')};
    width: ${props => (props.width ? `${props.width}px` : '45px')};
    
    ::before{
        font-size: ${props => (props.width ? `${props.width}px` : '45px')};
    }
`;

const Description = styled('a')`
    color: ${textColor};
    font-size: ${props => parse(props.font_size || 20)};
    font-weight: bold;
`;

const Submenu = styled('div')`
    height: auto;
    left: 100%;
    min-width: 200px;
    padding-left: 15px;
    position: absolute;
    top: 0;
    width: auto;
    z-index: 2;
`;

const SubmenuList = styled('ul')`
    background: white;
    border-radius: 15px;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
    color: black;
    height: 100%;
    padding: 30px;
    width: 100%;
`;

const circle = css`
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
    display: flex;
    font-size: ${parse(19)};
    height: 32px;
    justify-content: center;
    position: relative;
    width: 32px;
    
    > a {
        height: 13px;
        line-height: 5px;
    }
`;

export {
    List, Item, Icon, Description, Submenu, SubmenuList,
};

IconTag.propTypes = {
    className: PropTypes.string,
    marginBottom: PropTypes.string,
};
