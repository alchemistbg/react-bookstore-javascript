import React, { Component } from 'react';

import { getBookCover } from '../../utils/requests';
import Donut from '../Preloader/Donut';

class BookCover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bookCover: null
        }
    }

    async componentDidMount() {
        const isbn = this.props.isbn;
        let cover = undefined;
        try {
            cover = await getBookCover(isbn, 'L');
        } catch (error) {
            cover = 'Cover not found'
        }
        this.setState({
            isLoading: false,
            bookCover: cover
        });
    }


    render() {
        const { isLoading, bookCover } = this.state;
        return (
            isLoading ? (<Donut />) : (
                <div className="book-cover">
                    <img src={bookCover} alt="" />
                </div>
            )
        )
    }
}

export default BookCover;