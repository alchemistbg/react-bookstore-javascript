import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import BookCover from './BookCover';
import BookInfo from './BookInfo';
import BookComments from './BookComments';

import { getBookDetails } from './../../requests/bookRequests'

class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isUpdated: false,
            book: {},
            bookCover: null,
            bookCommentPlaceholder: 'Type your comment here...',
            bookComment: ''
        }
    }

    handleAddToCartClick = () => {
        console.log(this.state.book.title + " added to cart")
    }

    handleCommentAreaChange = (event) => {
        const comment = event.target.value;
        if (comment === '') {
            event.target.placeholder = this.state.bookCommentPlaceholder;
        }
        this.setState({
            bookComment: comment
        });
    }

    handleCommentAreaFocus = (event) => {
        console.log(event.target.value);
        if (!event.target.value) {
            event.target.placeholder = this.state.bookCommentPlaceholder;
        } else {
            event.target.placeholder = '';
        }
    }

    handleCommentButton = () => {
        console.log(this.state.bookComment);
    }

    async componentDidMount() {
        let bookData = {}
        if (this.props.location.state) {
            bookData = { ...this.props.location.state.book };
        } else {
            const bookId = this.props.match.params.id;
            try {
                const bookDataResponse = await getBookDetails(bookId);
                bookData = bookDataResponse.data.book;
            } catch (error) {
                bookData = {};
            }
        }

        this.setState({
            // pageName: `Reactive Bookstore | ${bookData.title}`,
            book: bookData,
            isUpdated: true
        });
    }

    render() {
        if (this.state.isUpdated) {
            const { book } = this.state;

            if (Object.keys(book).length === 0) {
                return (
                    <Redirect to="/not-found" />
                );
            } else {
                return (
                    // document.title = this.state.pageName,
                    document.title = this.state.book.title,
                    <div className="book-data">
                        <div className="book-details">
                            <BookCover isbn={book.isbn} />
                            <BookInfo book={book} />
                        </div>
                        <div className="book-comments">
                            <BookComments book={book} />
                        </div>
                        <hr />

                        <div className="book-comment-form">
                            <h5>Comment this book</h5>
                            <textarea
                                className="comment-area"
                                name="comment"
                                id="comment"
                                rows="4"
                                placeholder={this.state.bookCommentPlaceholder}
                                onFocus={this.handleCommentAreaFocus}
                                onChange={this.handleCommentAreaChange} >
                            </textarea>
                            <button className="form-button comment-button" type="submit" onClick={this.handleCommentButton}>Comment</button>
                        </div>
                    </div>
                )
            }

        }

        return null;
    }
}

export default BookDetails;