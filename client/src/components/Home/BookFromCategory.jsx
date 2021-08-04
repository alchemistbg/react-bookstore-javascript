import React, { Fragment, useState, useEffect, useMemo } from 'react';

import Slider from 'react-slick';
import "./../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../node_modules/slick-carousel/slick/slick-theme.css";

import BookCard from './../BookCard/BookCard';
import { useWindowSize } from './../../utils/hooks';

import { getBooks } from './../../requests/bookRequests';
import Donut from './../Common/Preloader/Donut';

const BookFromCategory = (props) => {
    const { category } = props;

    const sliderSettings = useMemo(() => {
        return {
            draggable: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            // infinite: false,
            // centerMode: true,
            // centerPadding: "0px"
        }
    }, []);

    const [pageWidth, pageHeight] = useWindowSize();
    useEffect(() => {
        if (pageWidth < 1025) {
            sliderSettings.slidesToShow = 2;
        } else if (pageWidth > 1024) {
            sliderSettings.slidesToShow = 3;
        }
    }, [pageWidth, sliderSettings]);

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