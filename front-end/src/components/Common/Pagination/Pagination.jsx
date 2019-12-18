import React from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash';

const Pagination = (props) => {
    const { link, itemsCount, pageSize, currentPage, onPageChange } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) {
        return null
    }

    const pages = _.range(1, pagesCount + 1);

    return (
        <ul className="pagination">
            {
                pages.map((page) => {
                    return (<li key={page} className="page-item">
                        <Link
                            className={page === currentPage ? "page-link active" : "page-link"}
                            to={link}
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