import React, { Fragment, useState, useEffect } from 'react';

import Slider from 'react-slick';
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../node_modules/slick-carousel/slick/slick.css";

import BookCard from '../BookCard/BookCard';

import { getBooks } from '../../services/requests';
import Donut from '../Common/Preloader/Donut';


function BookFromCategory(props) {
    const { category } = props;

    const sliderSettings = {
        draggable: false,
        infinite: false,
        speed: 250,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    let [books, setBooks] = useState([]);
    let [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getBooks(category)
            .then((booksFromCategory) => {
                setBooks(booksFromCategory.data.books);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, []);

    return (
        <Fragment>
            <h5 className="category">{category} books</h5>
            {isLoading ?
                (
                    <Donut />
                ) : (
                    <Slider {...sliderSettings}>
                        {
                            books.map((book) => {
                                return <BookCard key={book} book={book} />
                            })
                        }
                    </Slider>
                )}
        </Fragment>
    );
}

export default BookFromCategory;