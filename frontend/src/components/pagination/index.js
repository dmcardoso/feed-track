import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from './style';
import { makePagination } from './util';

function Pagination({
    pages, page, onPageChange, previousText, nextText, ...props
}) {
    function changePage(this_page) {
        if (this_page === page) {
            return;
        }

        onPageChange(this_page);
    }


    return (
        <Container>
            <Button
                onClick={() => {
                    if (page === 1) return;
                    changePage(page - 1);
                }}
                first
                disabled={page === 1}
            >
                {previousText}
            </Button>
            {makePagination({
                pageCount: pages,
                selected: page,
                Component: Button,
                changePage,
            })}
            <Button
                onClick={() => {
                    if (page === pages) return;
                    changePage(page + 1);
                }}
                disabled={page === pages}
            >
                {nextText}
            </Button>
        </Container>
    );
}

Pagination.propTypes = {
    pages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    previousText: PropTypes.string,
    nextText: PropTypes.string,
};

Pagination.defaultProps = {
    previousText: '<',
    nextText: '>',
};

export default Pagination;
// {visiblePages.map((this_page, index, array) => (
//     <Button
//         key={this_page}
//         active={page === this_page}
//         onClick={() => changePage(this_page)}
//     >
//         {array[index - 1] + 2 < this_page ? `...${this_page}` : this_page}
//     </Button>
// ))}
