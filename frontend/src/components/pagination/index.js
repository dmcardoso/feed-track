import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from './style';

function Pagination({
    pages, page, onPageChange, previousText, nextText, ...props
}) {
    const [visiblePages, setVisiblePages] = useState([]);

    useEffect((teste) => {
        setVisiblePages(getVisiblePages(null, pages));
        changePage(page);
    }, [pages]);


    useEffect(() => {
        setVisiblePages(getVisiblePages(null, pages));
    }, []);


    const filterPages = (newVisiblePages, totalPages) => newVisiblePages.filter(this_page => this_page <= totalPages);

    function getVisiblePages(this_page, total) {
        if (total < 7) {
            return filterPages([1, 2, 3, 4, 5, 6], total);
        }
        if (this_page % 5 >= 0 && this_page > 4 && this_page + 2 < total) {
            return [1, this_page - 1, this_page, this_page + 1, total];
        } if (this_page % 5 >= 0 && this_page > 4 && this_page + 2 >= total) {
            return [1, total - 3, total - 2, total - 1, total];
        }
        return [1, 2, 3, 4, 5, total];
    }

    function changePage(this_page) {
        if (this_page === page) {
            return;
        }

        const newVisiblePages = getVisiblePages(this_page, pages);

        setVisiblePages(filterPages(newVisiblePages, pages));

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
            {visiblePages.map((this_page, index, array) => (
                <Button
                    key={this_page}
                    active={page === this_page}
                    onClick={() => page !== this_page && changePage(this_page)}
                >
                    {array[index - 1] + 2 < this_page ? `...${this_page}` : this_page}
                </Button>
            ))}
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
