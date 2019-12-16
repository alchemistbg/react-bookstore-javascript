import React, { Fragment, useState, useEffect } from 'react';

import Slider from 'react-slick';
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../node_modules/slick-carousel/slick/slick.css";

import BookCard from '../BookCard/BookCard';

import { getBooks } from '../../utils/requests';


function BookFromCategory(props) {
    const { category } = props;

    const sliderSettings = {
        draggable: false,
        infinite: false,
        speed: 250,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    let [books, setBooks] = useState([])

    useEffect(() => {
        getBooks(category)
            .then((booksFromCategory) => {
                setBooks(booksFromCategory.data.books);
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, []);

    return (
        <Fragment>
            <h4 className="category">{category} books</h4>
            <Slider {...sliderSettings}>
                {
                    books.map((book) => {
                        return <BookCard key={book} book={book} />
                    })
                }
            </Slider>
        </Fragment>
    );
}

export default BookFromCategory;