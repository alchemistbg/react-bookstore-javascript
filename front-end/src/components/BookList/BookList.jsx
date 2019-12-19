import React, { Component, Fragment } from 'react';

import Donut from '../Common/Preloader/Donut';
import BookCard from '../BookCard/BookCard';
import Pagination from './../Common/Pagination/Pagination';

import { paginate } from '../../utils/paginate';
import { getBooks, getBooksByGenre } from '../../services/requests';

class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageName: 'Reactive Bookstore | Books',
            isLoading: true,
            genre: '',
            books: [],
            pageSize: 6,
            currentPage: 1
        }
    }

    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        });
    }

    static getDerivedStateFromProps({ genre }) {
        return {
            genre
        }
    }

    async componentDidMount() {
        let booksResponse = undefined;
        let genreFromUrl = '';
        if (this.props.match.params.id) {
            genreFromUrl = this.props.match.params.id;
            booksResponse = await getBooksByGenre(genreFromUrl);
        }
        else {
            booksResponse = await getBooks();
        }

        this.setState({
            books: booksResponse.data.books,
            isLoading: false
        });
    }

    render() {
        console.log(this.state.genre)
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

        let booksToUse = [];
        if (this.state.genre) {
            booksToUse = allBooks.filter((book) => {
                return book.genres.some((genres) => genres.name === this.state.genre);
            });
            console.log(booksToUse)
        } else {
            booksToUse = allBooks;
        }

        const booksPage = paginate(booksToUse, currentPage, pageSize);;

        return (
            document.title = pageName,

            <Fragment>
                <div className="container">
                    <h2>Our books</h2>
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
                        link={this.props.location}
                        itemsCount={booksToUse.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />
                </div>
            </Fragment>
        );
    }

}

export default BookList;