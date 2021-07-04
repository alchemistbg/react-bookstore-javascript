import { BASE_URL } from './../utils/constants.js';

import axios from 'axios';
axios.defaults.withCredentials = true;

async function getBookCover(isbn, size) {
    // const cover = await axios.get(`https://cors-anywhere.herokuapp.com/http://covers.openlibrary.org/b/ISBN/${isbn}-${size}.jpg`,
    const cover = await axios.get(`https://covers.openlibrary.org/b/ISBN/${isbn}-${size}.jpg`, { responseType: 'blob', withCredentials: false });
    return URL.createObjectURL(cover.data);
}

async function getBooks(category = '') {
    return await axios.get(`${BASE_URL}/books/${category}`);
}

async function getBooksByGenre(genre) {
    return await axios.get(`${BASE_URL}/books/genres/${genre}`);
}

async function getBookDetails(bookId) {
    return await axios.get(`${BASE_URL}/books/${bookId}`);
}

async function postComment(comment, bookId) {
    return await axios.post(`${BASE_URL}/books/${bookId}/comments`, comment);
}

async function getGenres() {
    return await axios.get(`${BASE_URL}/genres`);
}

export {
    getBooks,
    getBooksByGenre,
    getBookDetails,
    getBookCover,
    postComment,
    getGenres,
}