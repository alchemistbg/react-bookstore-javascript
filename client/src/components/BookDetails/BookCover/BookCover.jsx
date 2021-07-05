import React, { useState, useEffect } from 'react';

import { getBookCover } from '../../../requests/bookRequests';
import Donut from '../../Common/Preloader/Donut';

function BookCover(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [bookCover, setBookCover] = useState(null);

    useEffect(() => {
        getBookCover(props.isbn, 'L')
            .then((cover) => {
                setBookCover(cover);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
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