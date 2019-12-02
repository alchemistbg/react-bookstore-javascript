const bookModel = require('../models/book');

module.exports = {

    getBooks: (req, res) => {
        bookModel.find()
            .populate({ path: 'genres', select: 'name' })
            .then((books) => {
                // books.map((book) => {
                //     return book.populate('genres');
                // });
                res.status(200).json({
                    books
                });
            })
            .catch();
    },

    bookCreate: (req, res) => {
        const { title, author, publisher, isbn, genres } = req.body;

        bookModel.create({ title, author, publisher, isbn, genres })
            .then((book) => {
                res.status(200).json({
                    message: "Book Added",
                    book
                });
            })
            .catch();
        // const book = new bookModel({ title, author, publisher, isbn, genres });
        // book.save().then().catch();

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