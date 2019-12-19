const bookModel = require('../models/Book');
const commentModel = require('../models/Comment');
const genreModel = require('../models/Genre');

module.exports = {

    getBooks: (req, res) => {
        bookModel.find()
            // .select('author title price isbn')
            .populate({ path: 'genres', select: 'name' })
            .populate({
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'commentCreator',
                    model: 'user',
                    select: ('username')
                }
            })
            .then((books) => {
                res.status(200).json({
                    message: "",
                    books
                });
            })
            .catch();
    },

    getUpcomingBooks: (req, res) => {
        bookModel.find({ status: "upcoming" })
            .sort("-addedOn")
            .limit(5)
            .populate({ path: 'genres', select: 'name' })
            .then((books) => {
                res.status(200).json({
                    message: "",
                    books
                });
            })
            .catch();
    },

    getNewestBooks: (req, res) => {
        bookModel.find({ status: "available" })
            .sort({ addedOn: -1 })
            .limit(5)
            .populate({ path: 'genres', select: 'name' })
            .populate({
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'commentCreator',
                    model: 'user',
                    select: ('username')
                }
            })
            .then((books) => {
                res.status(200).json({
                    message: "",
                    books
                });
            })
            .catch();
    },

    getBestsellingBooks: (req, res) => {
        bookModel.find()
            .sort({ soldNumber: -1 })
            .limit(5)
            .populate({ path: 'genres', select: 'name' })
            .populate({
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'commentCreator',
                    model: 'user',
                    select: ('username')
                }
            })
            .then((books) => {
                res.status(200).json({
                    message: "",
                    books
                });
            })
            .catch((error) => {

            });
    },

    getBooksByGenre: (req, res) => {
        const genre = req.params.id;
        // console.log(genre);
        genreModel.findOne({ name: genre })
            .then((genre) => {
                if (!genre) {
                    res.status(404).json({
                        message: "Genre not found"
                    });
                }
                bookModel.find({ genres: genre._id })
                    .populate({ path: 'genres', select: 'name' })
                    .populate({
                        path: 'comments',
                        model: 'comment',
                        populate: {
                            path: 'commentCreator',
                            model: 'user',
                            select: ('username')
                        }
                    })
                    .then((books) => {
                        res.status(200).json({
                            message: "",
                            books
                        });
                    })
                    .catch()
            })
            .catch();
        // bookModel.findOne({ 'genres.name': genre })
        //     // .populate({ path: 'genres', select: 'name' })
        //     .then((books) => {
        //         res.status(200).json({
        //             message: "",
        //             books
        //         });
        //     })
        //     .catch((error) => {

        //     });
    },

    bookCreate: (req, res) => {
        const { title, author, publisher, isbn, genres } = req.body;

        bookModel.create({ title, author, publisher, isbn, genres })
            .then((book) => {
                // bookModel.populate({ path: 'genre' });
                // console.log(book)
                res.status(201).json({
                    message: "Book Added",
                    book
                });
            })
            .catch();
    },

    bookDetails: (req, res, next) => {
        const bookId = req.params.id;
        bookModel.findById(bookId)
            .populate({ path: 'genres', select: 'name' })
            // .populate({ path: 'comments' })
            .populate({
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'commentCreator',
                    model: 'user',
                    select: ('username')
                }
            })
            .then((book) => {
                if (!book) {
                    res.status(404).json({
                        message: "Book not found",
                    });
                    return;
                }

                res.status(200).json({
                    message: "Book found",
                    book
                });
            })
            .catch((error) => {
                error.status = 400;

                next(error);
            });
    },

    bookUpdate: (req, res) => {

    },

    bookDelete: (req, res) => {

    },

    bookGetComments: (req, res) => {
        const bookId = req.params.id;
        bookModel.findById(bookId)
            .select('comments')
            .populate({
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'commentCreator',
                    model: 'user',
                    select: ('username')
                }
            })
            .then((comments) => {
                console.log(comments)
                res.status(200).json({
                    message: "Book comments:",
                    comments: comments.comments
                });
            })
            .catch();

    },

    bookPostComment: (req, res) => {
        const bookId = req.params.id;
        const { commentCreator, commentContent } = req.body;

        commentModel.create({ commentCreator, commentContent })
            .then((comment) => {
                bookModel.findById(bookId)
                    .then((book) => {
                        book.comments.push(comment._id);
                        book.save()
                            .then((book) => {
                                res.status(201).json({
                                    message: "Comment created",
                                    book
                                });
                            })
                            .catch();
                        console.log(comment._id)
                    })
                    .catch();
            })
            .catch((error) => console.log(error));
        // console.log(`
        //     User ${commentCreator} commented book ${bookId}:
        //     ${commentContent}
        // `);
    }

}