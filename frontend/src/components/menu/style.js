import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {parse} from '../../util/styled-components/font-size';
import {textColor, colors} from '../../configs/styled-components-options';


const IconTag = ({className, icon, ...props}) => (
    <div className={className} {...props}/>
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
    align-items: center;
    display: flex;
    height: 45px;
    position: relative;
    width: fit-content;
    margin-bottom: ${props => ((props.marginBottom) ? `${props.marginBottom}px` : '0')}
    border-style: ${props => (props.borderBottom ? 'solid' : null)};
    border-bottom-width: ${props => (props.borderBottom ? `${props.borderBottom}px` : '0')};
    padding-bottom: ${props => (props.borderBottom ? '37.5px' : '0')};
    border-color: ${textColor};
    
    :hover {
        a,
        [class^='icon-'] {
            color: ${colors.green};    
        }
    }
`;

const Icon = styled(IconTag)`
    color: ${textColor};
    height: 45px;
    margin-right: 20px;
    width: 45px;
    
    ::before{
        font-size: 45px;
    }
`;

const Description = styled('a')`
    color: ${textColor};
    font-size: ${parse(20)};
    font-weight: bold;
`;

const Submenu = styled('div')`
    width: 200px;
    height: 200px;
    left: 100%;
    top: 0;
    position: absolute;
`;

const SubmenuList = styled('ul')`
    width: 100%;
    height: 100%;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
    background: white;
    color: black;
`;

export {
    List, Item, Icon, Description, Submenu, SubmenuList
};

IconTag.propTypes = {
    className: PropTypes.string,
    marginBottom: PropTypes.string,
};
