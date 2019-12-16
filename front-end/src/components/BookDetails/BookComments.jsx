import React, { Fragment } from 'react'

import { timeFormat } from '../../utils/helpers';

function BookComments(props) {
    const { book } = props;
    return (
        <Fragment>
            <h5>Comments:</h5>
            {
                book.comments.length === 0 ?
                    (
                        <h6>There are no comments yet</h6>
                    ) : (
                        <ul className="comments-list">
                            {
                                book.comments.map((comment) => {
                                    const commentTime = timeFormat(comment.commentTime);
                                    const content = comment.commentContent;
                                    const username = comment.commentCreator.username;

                                    return <li key={comment.commentTime} className="comment-item">
                                        <div className="comment-meta">
                                            <span className="comment-time">on {commentTime} </span>
                                            <span className="comment-author">{username} wrote:</span>
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
        </Fragment>
    );
}

export default BookComments;