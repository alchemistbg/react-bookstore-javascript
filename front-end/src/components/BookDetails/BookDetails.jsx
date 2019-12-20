import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom';

import BookCover from './BookCover';
import BookInfo from './BookInfo';
import BookComments from './BookComments';

import { getBookDetails, postComment } from '../../services/requests';
import { showToast } from '../../utils/helpers';

import AuthContext from './../../context/authContext/AuthContext';

function BookDetails(props) {

    const [{ isLoggedIn, userId }] = useContext(AuthContext);
    // console.log(userId);

    const bookCommentPlaceholder = 'Type your comment here...';
    const [isLoading, setLoading] = useState(true);
    const [book, setBook] = useState({});
    const [bookComment, setComment] = useState('');

    useEffect(() => {
        if (props.location.state) {
            setBook(props.location.state.book);
            setLoading(false);
        } else {
            const bookId = props.match.params.id;
            getBookDetails(bookId)
                .then((book) => {
                    console.log(book.data.book)
                    setBook(book.data.book);
                    setLoading(false);
                })
                .catch(error => {

                })
        }
    }, []);

    const handleAddToCartClick = () => {
        console.log(this.state.book.title + " added to cart")
    }

    const handleCommentAreaChange = (event) => {
        const comment = event.target.value;
        setComment(comment);
        // if (comment === '') {
        //     event.target.placeholder = this.state.bookCommentPlaceholder;
        // }
        // this.setState({
        //     bookComment: comment
        // });
    }

    const handleCommentAreaFocus = (event) => {
        // console.log(event.target.value);
        // if (!event.target.value) {
        //     event.target.placeholder = this.state.bookCommentPlaceholder;
        // } else {
        //     event.target.placeholder = '';
        // }
    }

    const handleCommentButton = () => {
        if (bookComment.length < 5) {
            showToast('simpleError', {
                title: 'Invalid comment!',
                message: 'Comment must be at least 5 characters long!'
            })
            return;
        }

        postComment({
            commentCreator: userId,
            commentContent: bookComment
        }, book._id)
            .then((response) => {
                showToast('success', {
                    title: `${response.data.message}.`,
                });
                setBook(response.data.book);
            })
            .catch(error => console.log(error.response));
    }

    return (
        <Fragment>
            {isLoading ? (
                <div></div>
            ) : (
                    document.title = book.title,
                    <div className="book-data">
                        <div className="book-details">
                            <BookCover isbn={book.isbn} />
                            <BookInfo book={book} />
                        </div>
                        <div className="book-comments">
                            <BookComments book={book} />
                        </div>
                        {
                            isLoggedIn ? (
                                <Fragment>
                                    <hr />
                                    <div className="book-comment-form">
                                        <h5>Comment this book</h5>
                                        <textarea
                                            className="comment-area"
                                            name="comment"
                                            id="comment"
                                            rows="4"
                                            placeholder={bookCommentPlaceholder}
                                            onFocus={handleCommentAreaFocus}
                                            onChange={handleCommentAreaChange} >
                                        </textarea>
                                        <button className="form-button comment-button" type="submit" onClick={handleCommentButton}>Comment</button>
                                    </div>
                                </Fragment>
                            ) : (
                                    <div></div>
                                )
                        }
                    </div>
                )}
        </Fragment>
    )
}

export default BookDetails;