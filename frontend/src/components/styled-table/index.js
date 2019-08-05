import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import './paginate.scss';

import {
    Table, HeaderTH, BodyTD, BodyTR, TableBody,
} from './style';

StyledTable.propTypes = {
    headers: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
};

function StyledTable({headers, data, ...attrs}) {

    const columns = headers.map(({name, ...header_props}) => (
        {
            Header: props => <HeaderTH>{name}</HeaderTH>,
            Cell: props => <BodyTD>{props.value}</BodyTD>,
            sortable: false,
            resizable: false,
            ...header_props
        }
    ));

    return (
        <>
            <Table
                data={data}
                columns={columns}
                TbodyComponent={props => <TableBody {...props} />}
                TrComponent={props => <BodyTR {...props} />}
                noDataText="Nenhum registro encontrado"
                minRows={0}
                {...attrs}
                PaginationComponent={props => (
                    <ReactPaginate
                        pageCount={props.pages}
                        pageRangeDisplayed={3}
                        previousLabel="<"
                        marginPagesDisplayed={2}
                        nextLabel=">"
                        containerClassName="paginate-container"
                        pageClassName="paginate-page"
                        previousClassName="paginate-previous"
                        nextClassName="paginate-next"
                        disabledClassName="paginate-disabled"
                        breakClassName="paginate-break"
                        activeClassName="active-page"
                        onPageChange={(e) => {
                            props.onPageChange();
                            console.log(e);
                        }}
                        initialPage={0}
                    />
                )}
            />
        </>
    );
}

export default StyledTable;
