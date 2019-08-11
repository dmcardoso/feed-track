import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../pagination';

import './paginate.scss';

import {
    Table, HeaderTH, BodyTD, BodyTR, TableBody,
} from './style';

StyledTable.propTypes = {
    headers: PropTypes.array.isRequired,
    data_function: PropTypes.func.isRequired,
};

const initialState = {
    loading: true,
    data: [],
    page: 1,
    pages: 0,
    showPagination: false,
};

function StyledTable({
    headers, data_function, ...attrs
}) {
    const [tableState, setTableState] = useState({ ...initialState });

    const columns = headers.map(({ name, ...header_props }) => (
        {
            Header: props => <HeaderTH>{name}</HeaderTH>,
            Cell: props => <BodyTD>{props.value}</BodyTD>,
            sortable: false,
            resizable: false,
            ...header_props,
        }
    ));

    const handleData = async (data_props) => {
        setTableState({ ...tableState, loading: true });

        const { pageSize = 15, page } = data_props;

        const request_data = await data_function({ page, limit: pageSize });
        const { total, results } = request_data.data;

        const pages = Math.ceil(Number(total) / Number(pageSize));

        setTableState({
            ...tableState, loading: false, data: results, pages, showPagination: pages > 1, page,
        });
    };

    return (
        <Table
            data={tableState.data}
            columns={columns}
            TbodyComponent={props => <TableBody {...props} />}
            TrComponent={props => <BodyTR {...props} />}
            noDataText="Nenhum registro encontrado"
            pageSize={15}
            manual
            page={tableState.page}
            pages={tableState.pages}
            loading={tableState.loading}
            showPagination={tableState.showPagination}
            minRows={0}
            previousText="<"
            nextText=">"
            onFetchData={handleData}
            getTdProps={(state, rowInfo, column, instance) => ({
                onClick: (e, handleOriginal) => {
                    console.log('A Td Element was clicked!');
                    console.log('it produced this event:', e);
                    console.log('It was in this column:', column);
                    console.log('It was in this row:', rowInfo);
                    console.log('It was in this table instance:', instance);

                    // IMPORTANT! React-Table uses onClick internally to trigger
                    // events like expanding SubComponents and pivots.
                    // By default a custom 'onClick' handler will override this functionality.
                    // If you want to fire the original onClick handler, call the
                    // 'handleOriginal' function.
                    if (handleOriginal) {
                        handleOriginal();
                    }
                },
            })}
            {...attrs}
            PaginationComponent={props => (<Pagination {...props} />)}
        />
    );
}

export default StyledTable;
