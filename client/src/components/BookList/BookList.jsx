import React, { Component, Fragment, useState, useEffect, useContext } from 'react'

import Donut from './../Common/Preloader/Donut';
import BookCard from './../BookCard/BookCard';
import Pagination from './../Common/Pagination/Pagination';
import SelectList from '../Common/SelectList/SelectList';
import { paginate } from './../../utils/paginate';
import { getBooks, getBooksByGenre } from './../../requests/bookRequests';

import SortContext from '../../context/sortContext/SortContext';
import { useWindowSize } from './../../utils/hooks';

const BookList = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [pageSize, setPageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const [{ booksSorting }, sortDispatch] = useContext(SortContext);

    const [selectIsOpen, setSelectIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const [sortCriteria, setSortCriteria] = useState('soldNumber');
    const [sortDirection, setSortDirection] = useState('desc');

    const selectHeader = "Sort by: ";
    const selectItems = [
        {
            text: "Popularity (Desc)",
            key: "timesSoldDesc",
            criteria: "soldNumber",
            direction: "desc"
        },
        {
            text: "Popularity (Asc)",
            key: "timesSoldAsc",
            criteria: "soldNumber",
            direction: "asc"
        },
        {
            text: "Price (Desc)",
            key: "priceDesc",
            criteria: "price",
            direction: "desc"
        },
        {
            text: "Price (Asc)",
            key: "priceAsc",
            criteria: "price",
            direction: "asc"
        },
    ]

    const onLoad = () => {
        let sortSettings = {};

        const storageData = localStorage.getItem('sortSettings');
        if (!storageData) {

            sortSettings.booksSorting = {
                sortCriteria,
                sortDirection
            }

            sortDispatch({
                type: 'SORT',
                payload: {
                    criteria: sortCriteria,
                    direction: sortDirection
                }
            });
        } else {

            sortSettings = JSON.parse(storageData);

            sortDispatch({
                type: 'LOAD_SORT_FROM_STORAGE',
                payload: {
                    criteria: sortSettings.booksSorting.sortCriteria,
                    direction: sortSettings.booksSorting.sortDirection
                }
            });

            setSortCriteria(sortSettings.booksSorting.sortCriteria);
            setSortDirection(sortSettings.booksSorting.sortDirection);
        }

        const option = getSelectedItem(sortSettings.booksSorting);
        setSelectedOption(option.text);
        sortBooks(sortSettings.booksSorting.sortCriteria, sortSettings.booksSorting.sortDirection);
    };

    useEffect(() => {
        getBooks()
            .then((response) => {
                setBooks(response.data.books);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [booksSorting]);

    const [pageWidth, pageHeight] = useWindowSize();
    useEffect(() => {
        if (pageWidth >= 1281) {
            setPageSize(8);
        } else if (pageWidth >= 501 && pageWidth <= 1280) {
            setPageSize(6);
        } else if (pageWidth <= 500) {
            setPageSize(4);
        }
    }, [pageWidth, pageSize]);

    const handleHeaderClick = () => {
        setSelectIsOpen(!selectIsOpen);
    }

    const getSelectedItem = (clickedItem) => {
        let selectedItem = undefined;

        if (typeof clickedItem === 'string') {
            selectedItem = selectItems.filter((item) => {
                return item.text === clickedItem;
            })[0];
        }

        if (typeof clickedItem === 'object') {
            selectedItem = selectItems.filter((item) => {
                return item.criteria === clickedItem.sortCriteria && item.direction === clickedItem.sortDirection;
            })[0];
        }

        return selectedItem;
    }

    const handleSelectChange = (event) => {
        const clickedItem = event.target.textContent;
        setSelectedOption(clickedItem);
        setSelectIsOpen(false);

        const selectedItem = getSelectedItem(clickedItem);
        sortDispatch({
            type: 'SORT',
            payload: {
                criteria: selectedItem.criteria,
                direction: selectedItem.direction
            }
        });

        setSortCriteria(selectedItem.criteria);
        setSortDirection(selectedItem.direction)

        sortBooks(selectedItem.criteria, selectedItem.direction);
    }

    const sortBooks = (sortCriteria, sortDirection) => {

        const reSortedBooks = books.sort((b1, b2) => {
            if (sortDirection === 'desc') {
                return b2[sortCriteria] - b1[sortCriteria];
            } else {
                return b1[sortCriteria] - b2[sortCriteria];
            }
        });
        setBooks(reSortedBooks);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const booksPage = paginate(books, currentPage, pageSize);
    let booksHTML = "";
    if (books.length === 0) {
        booksHTML = <Fragment>
            {/* <div className="container"> */}
            <h2>Our books</h2>
            <h4>At the moment there are no books in our database.</h4>
            <p>This could be due to maintenance. Please, come back later.</p>
            <p>If you still this page and think this is wrong,
                feel free to contact us.</p>
            {/* </div> */}
        </Fragment>
    } else {
        booksHTML = <Fragment>
            {/* <div className="container"> */}
            <h2>Our books</h2>
            <SelectList
                selectListClassNames="select-list-items"
                selectItemClassNames="select-list-item"
                selectListHeader={selectHeader}
                selectIsOpen={selectIsOpen}
                selectListItems={selectItems}
                selectedOption={selectedOption}
                handleHeaderClick={handleHeaderClick}
                handleSelectChange={handleSelectChange}
            ></SelectList>
            <ul className='book-list' onLoad={onLoad}>
                {
                    booksPage.map((book) => {
                        return <li key={book._id}>
                            <BookCard book={book} />
                        </li>
                    })
                }
            </ul>
            <Pagination
                link={props.location}
                itemsCount={books.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange} />
            {/* </div> */}
        </Fragment>
    }

    return <Fragment>
        {
            isLoading ?
                <div className="book-list-loader">
                    <Donut />
                </div> : booksHTML
        }
    </Fragment>
};

export default BookList;