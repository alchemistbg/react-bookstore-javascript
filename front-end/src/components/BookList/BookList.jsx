import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'

// import axios from 'axios';

import Donut from '../Common/Preloader/Donut';
import BookCard from '../BookCard/BookCard';
// import Sidebar from './Sidebar';
import Pagination from './../Common/Pagination/Pagination';

import { paginate } from '../../utils/paginate';
import { getBooks, getBooksByGenre } from '../../utils/requests';

class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageName: 'Reactive Bookstore | Books',
            isLoading: true,
            // fromGenre: false,
            books: [],
            pageSize: 8,
            currentPage: 1
        }
    }

    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        });
        // console.log(page);
    }

    async componentDidMount() {
        let booksResponse = undefined;
        if (this.props.match.url.includes('genres')) {
            // console.log('skdmflskdmfsldkfm')
            // this.setState({
            //     fromGenre: true
            // });
            const genre = this.props.match.params.id;
            console.log(genre)
            try {
                booksResponse = await getBooksByGenre(genre);
            } catch (error) {
                console.log(error.response);
                return;
            }
        } else {
            booksResponse = await getBooks();
        }
        this.setState({
            books: booksResponse.data.books,
            isLoading: false
        });

    }

    render() {
        const { length: booksCount } = this.state.books;
        const { pageName, books: allBooks } = this.state;
        const { pageSize, currentPage } = this.state;
        if (this.state.isLoading) {
            return <div className="book-list-loader">
                <Donut />
            </div>
        }

        if (booksCount === 0) {
            return (
                <Fragment>
                    <h4>At the moment there are no books in our database.</h4>
                    <p>This could be due to maintenance. Please, come back later.</p>
                    <p>If you still this page and think this is wrong,
                        feel free to contact us.</p>
                </Fragment>
            )
        }

        const booksPage = paginate(allBooks, currentPage, pageSize);

        return (
            document.title = pageName,
            <Fragment>
                <ul className='book-list'>
                    {
                        booksPage.map((book) => {
                            return <li key={book._id}>
                                <BookCard book={book} />
                            </li>
                        })
                    }
                </ul>
                <Pagination
                    itemsCount={allBooks.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange} />
            </Fragment>
        );
    }

}

export default BookList;