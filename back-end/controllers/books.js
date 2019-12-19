const bookModel = require('../models/Book');
const commentModel = require('../models/Comment');
const genreModel = require('../models/Genre');
const userModel = require('../models/User');
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
    },

    bookCreate: (req, res) => {
        const { title, author, publisher, isbn, genres } = req.body;

        bookModel.create({ title, author, publisher, isbn, genres })
            .then((book) => {
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
            .populate({
                path: 'comments',
                populate: {
                    path: 'commentCreator',
                    model: 'user',
                    select: ('userName')
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
                res.status(200).json({
                    message: "Book comments:",
                    comments: comments.comments
                });
            })
            .catch();

    },

    bookPostComment: async (req, res) => {
        const bookId = req.params.id;
        const { commentCreator, commentContent } = req.body;

        try {
            const comment = await commentModel({ commentCreator, commentContent, bookCommented: bookId });
            await comment.save();

            const book = await bookModel.findById(bookId);
            book.comments.push(comment._id);
            await book.save();

            const user = await userModel.findById(commentCreator);
            user.comments.push(comment._id);
            await user.save();

            res.status(201).json({
                message: "sldkmvmk f",
                book,
                user
            });
        } catch (error) {
            console.log(error);
        }
    }

}