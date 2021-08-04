import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getBookCover } from '../../../requests/bookRequests';
import Donut from '../../Common/Preloader/Donut';

const BookCover = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [bookCover, setBookCover] = useState(null);

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();

        getBookCover(props.isbn, 'L', cancelTokenSource)
            .then((cover) => {
                setBookCover(cover);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            cancelTokenSource.cancel();
        }
    }, []);

    return (
        isLoading ? (<Donut />) : (
            <div className="book-cover">
                <img src={bookCover} alt="" />
            </div>
        )
    )
}

export default BookCover;