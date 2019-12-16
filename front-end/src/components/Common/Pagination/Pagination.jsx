import React from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash';

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    console.log(currentPage)
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) {
        return null
    }

    const pages = _.range(1, pagesCount + 1);

    return (
        <ul className="pagination">
            {
                pages.map((page) => {
                    console.log(page === currentPage, page, currentPage);
                    return (<li key={page} className="page-item">
                        <Link
                            className={page === currentPage ? "page-link active" : "page-link"}
                            to="/books"
                            onClick={() => onPageChange(page)}>
                            {page}
                        </Link>
                    </li>)
                })
            }
        </ul >
    );
}

export default Pagination;