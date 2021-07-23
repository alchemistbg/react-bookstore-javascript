import React, { Fragment, useState, useEffect, useContext } from 'react';
// import { Redirect } from 'react-router-dom';

import BookCover from './BookCover/BookCover';
import BookInfo from './BookInfo/BookInfo';
import BookComments from './BookComments/BookComments';

import { getBookDetails, postComment } from './../../requests/bookRequests';
import { showToast } from './../../utils/helpers';

import UserContext from './../../context/userContext/UserContext';
import BookCommentsForm from './BookCommentsForm/BookCommentsForm';

const BookDetails = (props) => {

    const [{ isLoggedIn, userId }] = useContext(UserContext);

    const bookCommentPlaceholder = 'Type your comment here...';
    const [isLoading, setIsLoading] = useState(true);
    const [book, setBook] = useState({});
    const [bookComment, setBookComment] = useState("");

    useEffect(() => {
        if (props.location.state) {
            // console.log(props.location.state);
            setBook(props.location.state.book);
            setIsLoading(false);
        } else {
            const bookId = props.match.params.id;
            getBookDetails(bookId)
                .then((book) => {
                    setBook(book.data.book);
                    setIsLoading(false);
                })
                .catch(error => {

                })
        }
    }, [props.location.state, props.match.params.id]);

    const handleCommentAreaChange = (event) => {
        event.preventDefault();
        const comment = event.target.value;
        setBookComment(comment);
    }

    const handleCommentAreaFocus = (event) => {
        // console.log(event.target.value);
        // if (!event.target.value) {
        //     event.target.placeholder = this.state.bookCommentPlaceholder;
        // } else {
        //     event.target.placeholder = '';
        // }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setBookComment("");
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
            .catch((error) => {
                console.log(error.response)
            });
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
                        <BookInfo {...props} book={book} />
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
                                    <BookCommentsForm
                                        bookComment={bookComment}
                                        bookCommentPlaceholder={bookCommentPlaceholder}
                                        handleCommentAreaFocus={handleCommentAreaFocus}
                                        handleCommentAreaChange={handleCommentAreaChange}
                                        handleSubmit={handleSubmit}
                                    />
                                    {/* <form onSubmit={handleSubmit}> */}
                                    {/* <textarea
                                            className="comment-area"
                                            name="comment"
                                            id="comment"
                                            rows="4"
                                            placeholder={bookCommentPlaceholder}
                                            onFocus={handleCommentAreaFocus}
                                            onChange={handleCommentAreaChange} >
                                        </textarea> */}
                                    {/* <button className="form-button comment-button" type="submit" >Comment</button> */}
                                    {/* </form> */}
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