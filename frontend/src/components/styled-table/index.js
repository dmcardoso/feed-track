import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../pagination';

import {
    Table,
} from './style';
import TableLoader from '../table-loader';
import Menu from '../menu';

const initialState = {
    loading: true,
    data: [],
    page: 1,
    pages: 0,
    showPagination: false,
};

function StyledTable({
    headers, data_function, submenuOption, clickHandler, fireFetch, ...attrs
}) {
    const [tableState, setTableState] = useState({ ...initialState });
    const tableRef = useRef(null);

    useEffect(() => {
        if (fireFetch && tableRef.current) {
            tableRef.current.fireFetchData();
        }
    }, [fireFetch]);

    const columns = headers.map(({ name, ...header_props }) => (
        {
            Header: props => <div className="headerOverflow">{name}</div>,
            Cell: props => <div className="headerOverflow">{props.value}</div>,
            sortable: false,
            resizable: false,
            ...header_props,
        }
    ));

    if (submenuOption) {
        columns.unshift(
            {
                Header: props => <div />,
                Cell: props => (
                    <div>
                        <Menu
                            description="..."
                            circle
                            className="submenu"
                            title="Opções"
                            collapsed="false"
                            submenu={submenuOption(props)}
                        />
                    </div>
                ),
                sortable: false,
                resizable: false,
                maxWidth: '10',
                id: 'submenu',
            },
        );
    }

    const padding_left_first_child = !!submenuOption;

    const handleData = async (data_props) => {
        setTableState({ ...tableState, loading: true });

        const { pageSize = 15, page } = data_props;

        const request_data = await data_function({ page, limit: pageSize });
        if (request_data.data) {
            const { total, results } = request_data.data;

            const pages = Math.ceil(Number(total) / Number(pageSize));

            setTableState({
                ...tableState, loading: false, data: results, pages, showPagination: pages > 1, page,
            });
        }
    };

    return (
        <Table
            data={tableState.data}
            columns={columns}
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
            ref={tableRef}
            onFetchData={handleData}
            padding_left_first_child={padding_left_first_child}
            getTdProps={(state, rowInfo, column, instance) => ({
                onClick: (e, handleOriginal) => {
                    if (column.id === 'submenu') {
                        return;
                    }
                    if (handleOriginal) {
                        handleOriginal();
                    }

                    if (clickHandler) {
                        clickHandler(state, rowInfo, column, instance);
                    }
                },
            })}
            {...attrs}
            PaginationComponent={props => (<Pagination {...props} />)}
            LoadingComponent={props => (<TableLoader {...props} />)}
        />
    );
}

StyledTable.propTypes = {
    headers: PropTypes.array.isRequired,
    data_function: PropTypes.func.isRequired,
    submenuOption: PropTypes.func,
    clickHandler: PropTypes.func,
    fireFetch: PropTypes.bool,
};

StyledTable.defaultProps = {
    submenuOption: null,
    clickHandler: null,
    fireFetch: null,
};

export default StyledTable;
