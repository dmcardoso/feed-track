import React from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { colors, textColor } from '../../configs/styled-components-options';

import { parse } from '../../util/styled-components/font-size';

const CustomComponent = props => (
    <div {...props} />
);

const Table = styled(ReactTable)`
    border: unset !important;
    height: 609px;
    overflow: hidden;
    width: 100%;
    
    .-header{
        height: 40px;
    }
    
    * {
        border: unset !important;
        box-shadow: unset !important;
    }
`;

const TableBody = styled(CustomComponent)`
    background: ${colors.white};
    border-radius: 25px;
    overflow: auto; 
    height: 100%;
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
`;

const BodyTD = styled('div')`
    background: transparent;
    color: ${colors.black};
    font-size: ${parse(16)};
    font-weight: bold;
    overflow: hidden;
    padding-left: 42px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`;



export {
    Table, HeaderTH, BodyTD, BodyTR, TableBody,
};
