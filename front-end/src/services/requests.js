import axios from 'axios';

const baseUrl = 'http://localhost:3000/routes';

async function getBookCover(isbn, size) {
    const cover = await axios.get(`https://cors-anywhere.herokuapp.com/http://covers.openlibrary.org/b/ISBN/${isbn}-${size}.jpg`,
        {
            responseType: 'blob'
        }
    );
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

async function getGenres() {
    return await axios.get(`${baseUrl}/genres`);
}

async function registerUser(registerData) {
    return axios.post(`${baseUrl}/genres`, registerData);
}

async function loginUser(loginData) {
    return axios.post(`${baseUrl}/users/auth`, loginData);
}

async function getUserProfile(userName) {
    return axios.get(`${baseUrl}/users/${userName}`);
}

export {
    getBooks,
    getBooksByGenre,
    getBookDetails,
    getBookCover,
    getGenres,
    registerUser,
    loginUser,
    getUserProfile
}