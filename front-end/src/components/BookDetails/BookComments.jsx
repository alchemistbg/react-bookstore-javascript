import React, { Component, Fragment, useState } from 'react'

import { timeFormat } from '../../utils/helpers';
import Pagination from './../Common/Pagination/Pagination';
import { paginate } from './../../utils/paginate';

class BookComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageSize: 5,
            currentPage: 1
        }
    }

    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        });
    }

    render() {
        const { book } = this.props;
        console.log(book._id)
        const { length: commentsCount } = book.comments;
        const { comments: allComments } = book;
        const { pageSize, currentPage } = this.state;

        const commentsPage = paginate(allComments, currentPage, pageSize);

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
                <Pagination
                    link={`/books/${book._id}`}
                    itemsCount={allComments.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange} />
            </Fragment>
        );
    }
}

// export default BookComments;
// function BookComments(props) {
//     const { book } = props;

//     return (

//     );
// }

export default BookComments;