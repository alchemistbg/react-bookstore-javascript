import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { timeFormat } from '../../utils/helpers';

const CommentsTab = (props) => {

    const { comments } = props;

    return <Fragment>

        <input className="input" type="radio" name="tabs" id="tab-3" />
        <div className="ilabel">
            <label className="label" htmlFor="tab-3">Comments</label>
            <div className="triangle"></div>
        </div>

        <div className="panel">

            <h4 className="header">Comments information</h4>
            <div className="comments-info">
                {
                    comments.length === 0 ?
                        (
                            <h6>You haven't commented any books yet!</h6>
                        ) : (
                            <ul className="comments-list">
                                {
                                    comments.map((comment) => {
                                        return <li key={comment._id} className="comment-item">
                                            <div className="commented-object">
                                                concerning <span className="highlighted"><Link to={`/books/${comment.bookCommented._id}`}>{comment.bookCommented.title}</Link></span>
                                            </div>
                                            <div className="comment-meta">
                                                <span className="comment-time">on {timeFormat(comment.commentTime)} </span>
                                                <span className="comment-author">YOU wrote:</span>
                                            </div>
                                            <div className="comment-content">
                                                {comment.commentContent}
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        )
                }
            </div>

        </div>
    </Fragment>
}

export default CommentsTab;