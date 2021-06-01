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

async function postComment(comment, bookId) {
    return await axios.post(`${baseUrl}/books/${bookId}/comments`, comment);
}

async function getGenres() {
    return await axios.get(`${baseUrl}/genres`);
}

async function checkIsLogged() {
    console.log("Check if user is logged in!!!")
    return axios.post(`${baseUrl}/users`, {
        withCredentials: true
    });
}
}

async function loginUser(loginData) {
    return axios.post(`${baseUrl}/users/auth`, loginData);
}

async function getUserProfile(userName) {
    return axios.get(`${baseUrl}/users/${userName}`);
}

async function postOrder(requestData) {
    return axios.post(`${baseUrl}/orders`, requestData);
}

async function getOrders(userId) {
    return axios.get(`${baseUrl}/users/${userId}/orders`)
}

export {
    getBooks,
    getBooksByGenre,
    getBookDetails,
    getBookCover,
    postComment,
    getGenres,
    registerUser,
    loginUser,
    getUserProfile,
    postOrder,
    getOrders
}