import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { parse } from '../../util/styled-components/font-size';
import { textColor, colors } from '../../configs/styled-components-options';


const IconTag = props => (
    <i className={props.className} />
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
    width: 100%;
    margin-bottom: ${props => ((props.marginBottom) ? `${props.marginBottom}px` : '0')}
    border-style: solid;
    border-bottom-width: ${props => (props.borderBottom ? '1px' : '0')};
    padding-bottom: ${props => (props.borderBottom ? '37.5px' : '0')};
    border-color: ${textColor};
    
    :hover {
        a,
        i {
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

export {
    List, Item, Icon, Description,
};

IconTag.propTypes = {
    className: PropTypes.string,
    marginBottom: PropTypes.string,
};
