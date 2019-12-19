import axios from 'axios';

async function getBookCover(isbn, size) {
    const cover = await axios.get(`https://cors-anywhere.herokuapp.com/http://covers.openlibrary.org/b/ISBN/${isbn}-${size}.jpg`,
        {
            responseType: 'blob'
        }
    );
    return URL.createObjectURL(cover.data);
}

async function getBooks(category = '') {
    // if (!genre) {
    //     return await axios.get(`http://localhost:3000/routes/books`);
    // }
    // console.log(genre)
    return await axios.get(`http://localhost:3000/routes/books/${category}`);
    // const books = await axios.get(`http://localhost:3000/routes/books/${category}`);
    // const booksData = books.data.books;
    // return booksData;
}

async function getBooksByGenre(genre) {
    return await axios.get(`http://localhost:3000/routes/books/genres/${genre}`);
}

async function getBookDetails(isbn) {
    return await axios.get(`http://localhost:3000/routes/books/${isbn}`);
    // const book = await axios.get(`http://localhost:3000/routes/books/${isbn}`);
    // const bookData = book.data.book;
    // return bookData;
}

async function getGenres() {
    return await axios.get('http://localhost:3000/routes/genres');
    // const genres = await axios.get('http://localhost:3000/routes/genres');
    // const genresData = genres.data.genres;
    // return genresData;
}

async function registerUser(registerData) {
    return axios.post('http://localhost:3000/routes/users/', registerData);
}

async function loginUser(loginData) {
    return axios.post('http://localhost:3000/routes/users/auth', loginData);
}

export {
    getBooks,
    getBooksByGenre,
    getBookDetails,
    getBookCover,
    getGenres,
    registerUser,
    loginUser
}