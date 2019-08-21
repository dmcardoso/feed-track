import React from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { colors, textColor } from '../../configs/styled-components-options';

import { parse } from '../../util/styled-components/font-size';

const CustomComponent = props => (
    <div {...props} />
);


const BodyTD = styled('div')`
    background: transparent;
    color: ${colors.black};
    font-size: ${parse(16)};
    font-weight: bold;
    padding-left: 42px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    
    *::before {
        font-size: 26px !important;
    }
`;

const Table = styled(ReactTable)`
    border: unset !important;
    height: 609px;
    max-width: 100%;
    overflow: hidden;
    width: 100%;
    
    .-header{
        height: 40px;
        max-width: 100% !important;
        min-width: 100% !important;
    }
    
    * {
        border: unset !important;
    }
    
    .rt-thead {
        box-shadow: unset !important;
    }
    
    .rt-td {
        overflow: visible !important;
        
        li.submenu{
            display: none;
        }
    }
    
    .rt-td:first-child {
        div${BodyTD}{
            padding-left: 25px;
        }
    }
`;

const TableBody = styled(CustomComponent)`
    background: ${colors.white};
    border-radius: 25px;
    height: 100%; 
    max-width: 100% !important;
    min-width: 100% !important;
    overflow: auto;
    padding: 19.5px 0;
`;

const HeaderTH = styled('div')`
    background: transparent;
    color: ${textColor};
    font-size: ${parse(18)};
    font-weight: bold;
    padding-left: 42px;
    text-align: left;
`;

const BodyTR = styled(CustomComponent)`
    align-items: center;
    display: flex;
    height: 55px;
    
    &.-even{
        background-color: ${colors['grey-even-table']};
    }
    
    &:hover ${BodyTD} {
        li.submenu{
            color: ${colors.black};
            display: block;
        }
        
        color: ${colors.green};
        cursor: pointer;  
    }
`;

export {
    Table, HeaderTH, BodyTD, BodyTR, TableBody,
};
