import axios from 'axios';

async function getBookDetails(isbn) {
    const book = await axios.get(`http://localhost:3000/routes/books/${isbn}`);
    const bookData = book.data.book;
    console.log(bookData)
    return bookData;
}

async function getBookCover(isbn, size) {
    const cover = await axios.get(`https://cors-anywhere.herokuapp.com/http://covers.openlibrary.org/b/ISBN/${isbn}-${size}.jpg`,
        {
            responseType: 'blob'
        }
    );
    return URL.createObjectURL(cover.data);
}

export {
    getBookCover,
    getBookDetails
}