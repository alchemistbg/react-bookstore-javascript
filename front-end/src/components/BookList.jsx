import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';

import axios from 'axios';

import Donut from './Donut';
import BookCard from './BookCard';
// import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            books: [],
        }
    }

    async componentDidMount() {
        const booksResponse = await axios.get('http://localhost:3000/routes/books');
        const books = booksResponse.data.books;
        this.setState({
            books: books,
            isLoading: false
        });

    }
    render() {

        if (this.state.isLoading) {
            return <Donut />
        }

        return <ul className='book-list'>
            {
                this.state.books.map((book) => {
                    return <li key={book._id}>
                        <BookCard book={book} />
                    </li>
                })
            }
        </ul >
    }

}

export default BookList;