import React from 'react';
import PropTypes from 'prop-types';

/* eslint no-continue: 0 */
/* eslint no-plusplus: 0 */
function makePagination(props) {
    const items = [];
    const {
        pageRangeDisplayed = 3,
        pageCount,
        marginPagesDisplayed = 3,
        selected,
        changePage,
        Component,
    } = props;

    if (pageCount <= pageRangeDisplayed) {
        for (let index = 0; index < pageCount; index++) {
            items.push(
                <Component
                    key={index}
                    active={selected === (index + 1)}
                    onClick={() => changePage(index + 1)}
                >
                    {index + 1}
                </Component>,
            );
        }
    } else {
        let leftSide = pageRangeDisplayed / 2;
        let rightSide = pageRangeDisplayed - leftSide;

        // If the selected page index is on the default right side of the pagination,
        // we consider that the new right side is made up of it (= only one break element).
        // If the selected page index is on the default left side of the pagination,
        // we consider that the new left side is made up of it (= only one break element).
        if (selected > pageCount - pageRangeDisplayed / 2) {
            rightSide = pageCount - selected;
            leftSide = pageRangeDisplayed - rightSide;
        } else if (selected < pageRangeDisplayed / 2) {
            leftSide = selected;
            rightSide = pageRangeDisplayed - leftSide;
        }

        let index;
        let page;
        let breakView;
        const createPageView = index_view => (
            <Component
                key={index_view}
                active={selected === index_view}
                onClick={() => changePage(index_view)}
            >
                {index_view}
            </Component>
        );

        for (index = 0; index < pageCount; index++) {
            page = index + 1;

            // If the page index is lower than the margin defined,
            // the page has to be displayed on the left side of
            // the pagination.
            if (page <= marginPagesDisplayed) {
                items.push(createPageView(page));
                continue;
            }

            // If the page index is greater than the page count
            // minus the margin defined, the page has to be
            // displayed on the right side of the pagination.
            if (page > pageCount - marginPagesDisplayed) {
                items.push(createPageView(page));
                continue;
            }

            // If the page index is near the selected page index
            // and inside the defined range (pageRangeDisplayed)
            // we have to display it (it will create the center
            // part of the pagination).
            if (index >= selected - leftSide && index <= selected + rightSide) {
                items.push(createPageView(page));
                continue;
            }

            // If the page index doesn't meet any of the conditions above,
            // we check if the last item of the current "items" array
            // is a break element. If not, we add a break element, else,
            // we do nothing (because we don't want to display the page).
            if (items[items.length - 1] !== breakView) {
                breakView = (
                    <Component key={`sep-${index}`} separator>
                        ...
                    </Component>
                );
                items.push(breakView);
            }
        }
    }

    return (
        <>
            {items}
        </>
    );
}

makePagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    selected: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
    Component: PropTypes.any.isRequired,
};

export { makePagination };
