import React, { Component } from 'react';

import { getBookCover } from '../../../requests/bookRequests';
import Donut from '../../Common/Preloader/Donut';

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
        console.log(cover);
    }


    render() {
        const { isLoading, bookCover } = this.state;
        return (
            isLoading ? (<Donut />) : (
                <div className="book-cover">
                    <img src={bookCover} alt="" />
                    {/* <img src={bookCover} alt="" crossorigin="anonymous" /> */}
                </div>
            )
        )
    }
}

export default BookCover;