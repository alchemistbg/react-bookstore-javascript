import React, { Fragment, useState } from 'react'

import { timeFormat } from '../../utils/helpers';
import Pagination from './../Common/Pagination/Pagination';
import { paginate } from './../../utils/paginate';

function BookComments(props) {
    const { book } = props;
    const { length: commentsCount } = book.comments;
    const { comments: allComments } = book;

    // const [pageSize, setPageSize] = useState(5);
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const commentsPage = paginate(allComments, currentPage, pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <Fragment>
            <h5>Comments:</h5>
            {
                commentsCount === 0 ?
                    (
                        <h6>There are no comments yet</h6>
                    ) : (
                        <ul className="comments-list">
                            {
                                commentsPage.map((comment) => {
                                    const commentTime = timeFormat(comment.commentTime);
                                    const content = comment.commentContent;
                                    const userName = comment.commentCreator.userName;

                                    return <li key={comment.commentTime} className="comment-item">
                                        <div className="comment-meta">
                                            <span className="comment-time">on {commentTime} </span>
                                            <span className="comment-author">{userName} wrote:</span>
                                        </div>
                                        <div className="comment-content">
                                            {content}
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    )
            }
            <Pagination
                link={`/books/${book._id}`}
                itemsCount={allComments.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange} />
        </Fragment>
    );
}

export default BookComments;