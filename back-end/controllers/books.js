const bookModel = require('../models/book');

module.exports = {
    getBooks: (req, res) => {
    },

    bookCreate: (req, res) => {
        const { title, author } = req.body;

        const book = new bookModel({ title, author });
        book.save();

        res.status(200).json({
            message: "Book Added",
            book
        });
    },

    bookDetails: (req, res) => {
        const bookId = req.params.id;
        bookModel.findById(bookId)
            .then((book) => {
                res.status(200).json({
                    message: "Book found",
                    book
                });
            })
            .catch();
    },

    bookUpdate: (req, res) => {

    },

    bookDelete: (req, res) => {

    }
}