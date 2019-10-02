import React from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { colors, textColor } from '../../configs/styled-components-options';

import { parse } from '../../util/styled-components/font-size';

const Table = styled(ReactTable)`
    //height: auto;
    //overflow: hidden;
    border: unset !important;
    height: 609px;
    width: 100%;
    
    * {
        border: unset !important;
    }
    
    .rt-thead {
        box-shadow: unset !important;
        height: 40px;
        max-width: 100% !important;
        min-width: 100% !important;
        
        .rt-tr {
            .rt-th {
                background: transparent;
                color: ${textColor};
                font-size: ${parse(18)};
                font-weight: bold;
                padding-left: 42px;
                text-align: left;
                
                .headerOverflow {
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                &:first-child{
                    padding-left: ${props => (props.padding_left_first_child ? '25px' : '42px')};
                }
            }
        }
    }
    
    .rt-tbody {
        background: ${colors.white};
        border-radius: 25px;
        height: 100%; 
        max-width: 100% !important;
        min-width: 100% !important;
        overflow: auto;
        padding: 19.5px 0;
        
        .rt-tr-group {
            flex: unset;
            height: 55px;

            .rt-tr{
                align-items: center;
                display: flex;
                
                &.-even{
                    background-color: ${colors['grey-even-table']};
                }
                
                &:hover .rt-td{
                    li.submenu{
                        color: ${colors.black};
                        display: block;
                    }
                                        
                    color: ${colors.green};
                    cursor: pointer;  
                }
                
                .rt-td {
                    align-items: center;
                    background: transparent;
                    color: ${colors.black};
                    display: flex;
                    font-size: ${parse(16)};
                    font-weight: bold;
                    height: 55px;
                    overflow: visible !important;
                    padding-left: 42px;
                    text-align: left;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    
                    .headerOverflow {
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    
                    *::before {
                        font-size: 26px !important;
                    }
                    
                    width: 100%;

                    &:first-child{
                        padding-left: ${props => (props.padding_left_first_child ? '25px' : '42px')};
                    }
                    
                    li.submenu{
                        display: none;
                    }
                }                
            }
        }
    }    
`;

export {
    Table,
};
