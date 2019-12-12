import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import Donut from './Donut';

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            book: this.props.book,
            bookCover: null,
            bookRating: 0.0
        }
    }

    async componentDidMount() {
        const bookCover = await axios.get(`https://cors-anywhere.herokuapp.com/http://covers.openlibrary.org/b/ISBN/${this.state.book.isbn}-M.jpg`,
            {
                responseType: 'blob'
            }
        );
        const bookRating = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/review_counts.json?isbns=${this.state.book.isbn}&key=PaSduIPEaxqsLRnTBjosg`);
        // const bookRating = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/review_counts.json?isbns=${this.state.book.isbn}`);

        this.setState({
            bookCover: URL.createObjectURL(bookCover.data),
            bookRating: bookRating.data.books[0].average_rating,
            isLoading: false
        });
    }

    render() {
        const { book } = this.state;

        if (this.state.isLoading) {
            return <Donut />
        }
        return <div className='book-item'>
            <Link to={{ pathname: `/books/${book._id}`, state: { book } }} >
                <div className="details">Details</div>
                <img src={this.state.bookCover} alt="" />
                <div>{book.title}</div>
                <div>{book.author}</div>
                {/* <div>{book.publisher}</div> */}
                {/* <div>{book.isbn}</div> */}
                {/* <div>{book.genres.map((genre, index) => {
                const gl = book.genres.length;
                if (index < gl - 1) {
                    return (genre['name'] + ", ");
                } else {
                    return (genre['name']);
                }
            })}</div> */}
                {/* <div>{this.state.bookRating}</div> */}
                <div>{book.price}$</div>
                {/* </Link> */}
                {/* <Route path="/books/:id" component={BookDetails} /> */}
                {/* <Route path="/books/:id" render={(props) => <BookDetails props={this.state.book} />} /> */}
            </Link>
        </div >
    }
}

export default Book;
