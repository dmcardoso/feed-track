import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import './paginate.scss';

import {
    Table, HeaderTH, BodyTD, BodyTR, TableBody,
} from './style';

StyledTable.propTypes = {};

const outer = [
    {
        name: 'Tanner Linsleya',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyb',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyc',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyd',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleye',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }, {
        name: 'Tanner Linsleyf',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        },
    }];
function StyledTable(props) {
    const data = [];


    const columns = [
        {
            Header: props => <HeaderTH>Name</HeaderTH>,
            accessor: 'name', // String-based value accessors!
            Cell: props => <BodyTD>{props.value}</BodyTD>, // Custom cell components!
            sortable: false,
        }, {
            Header: props => <HeaderTH>Age</HeaderTH>,
            accessor: 'age',
            Cell: props => <BodyTD>{props.value}</BodyTD>, // Custom cell components!
        }, {
            id: 'friendName', // Required because our accessor is not a string
            Header: props => <HeaderTH>Friend Name</HeaderTH>,
            accessor: d => d.friend.name, // Custom value accessors!
            Cell: props => <BodyTD>{props.value}</BodyTD>, // Custom cell components!
        }, {
            Header: props => <HeaderTH>Friend Age</HeaderTH>,
            accessor: 'friend.age',
            Cell: props => <BodyTD>{props.value}</BodyTD>, // Custom cell components!
        }];

    // pageCount pages
    // pageRangeDisplayed
    // marginPagesDisplayed
    // previousLabel
    // nextLabel
    // onPageChange onPageChange
    // initialPage

    return (
        <>
            <Table
                data={data}
                columns={columns}
                TbodyComponent={props => <TableBody {...props} />}
                TrComponent={props => <BodyTR {...props} />}
                noDataText="Nenhum registro encontrado"
                minRows={0}
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
