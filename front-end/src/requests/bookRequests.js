import axios from 'axios';
axios.defaults.withCredentials = true;

// const baseUrl = 'http://localhost:3000/routes';
const baseUrl = 'http://localhost:5001/api';

async function getBookCover(isbn, size) {
    // const cover = await axios.get(`https://cors-anywhere.herokuapp.com/http://covers.openlibrary.org/b/ISBN/${isbn}-${size}.jpg`,
    const cover = await axios.get(`http://covers.openlibrary.org/b/ISBN/${isbn}-${size}.jpg`, { responseType: 'blob', withCredentials: false });
    return URL.createObjectURL(cover.data);
}

async function getBooks(category = '') {
    return await axios.get(`${baseUrl}/books/${category}`);
}

async function getBooksByGenre(genre) {
    return await axios.get(`${baseUrl}/books/genres/${genre}`);
}

async function getBookDetails(bookId) {
    return await axios.get(`${baseUrl}/books/${bookId}`);
}

async function postComment(comment, bookId) {
    return await axios.post(`${baseUrl}/books/${bookId}/comments`, comment);
}

async function getGenres() {
    return await axios.get(`${baseUrl}/genres`);
}

export {
    getBooks,
    getBooksByGenre,
    getBookDetails,
    getBookCover,
    postComment,
    getGenres,
}