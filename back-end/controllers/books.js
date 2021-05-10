const bookModel = require('../models/Book');
const commentModel = require('../models/Comment');
const genreModel = require('../models/Genre');
const userModel = require('../models/User');

const populateCommentsOption = {
    path: 'comments',
    model: 'comment',
    populate: {
        path: 'commentCreator',
        model: 'user',
        select: ('userName')
    }
}

const populateGenreOption = {
    path: 'genres',
    select: 'name'
}

module.exports = {

    getBooks: (req, res) => {
        bookModel.find()
            // .select('author title price isbn')
            .populate(populateGenreOption)
            .populate(populateCommentsOption)
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
            .populate(populateGenreOption)
            .populate(populateCommentsOption)
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
            .populate(populateGenreOption)
            .populate(populateCommentsOption)
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
            .populate(populateGenreOption)
            .populate(populateCommentsOption)
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
                    .populate(populateGenreOption)
                    .populate(populateCommentsOption)
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

    bookCreate: (req, res, next) => {
        if (req.user.userRole !== "admin") {
            return res.status(403).json({
                message: "Forbidden! You do not have rights for this operation."
            });
        }

        const bookData = { ...req.body };
        bookModel.find({ isbn: bookData.isbn })
            .then((book) => {
                if (book.length > 0) {
                    return res.status(409).json("The book already exist");
                } else {
                    return bookModel.create(bookData);
                }
            })
            .then((book) => {
                return res.status(201).json({
                    message: "Book created successfully",
                    book
                });
            })
            .catch((error) => {
                error.status = 400;

                // next(error);
            });
    },

    bookDetails: (req, res, next) => {
        const bookId = req.params.id;
        bookModel.findById(bookId)
            .populate(populateGenreOption)
            .populate(populateCommentsOption)
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
        if (req.user.userRole !== "admin") {
            return res.status(403).json({
                message: "Forbidden! You do not have rights for this operation."
            });
        }
        else {
            const bookId = req.params.id;
            const newBook = { ...req.body };
            bookModel.findById(bookId)
                .then((oldBook) => {
                    if (!oldBook) {
                        return res.status(404).json({
                            message: "Book not found",
                        });
                    } else {
                        return bookModel.updateOne(newBook);
                    }
                })
                .then((result) => {
                    return bookModel.findById(bookId);
                })
                .then((book) => {
                    return res.status(200).json({
                        message: "Book updated successfully",
                        book
                    });
                })
                .catch((error) => {
                    return res.status(400).json({
                        message: "Something went wrong!",
                        error
                    });
                });
        }
    },

    bookDelete: (req, res, next) => {
        if (req.user.userRole !== "admin") {
            return res.status(403).json({
                message: "Forbidden! You do not have rights for this operation."
            });
        } else {
            const bookId = req.params.id;
            bookModel.findById(bookId)
                .then((book) => {
                    if (!book) {
                        return res.status(404).json({
                            message: "Book not found"
                        });
                    } else {
                        return bookModel.deleteOne(book);
                    }
                })
                .then((result) => {
                    return res.status(200).json({
                        message: `Book with id '${bookId}' was deleted successfully`,
                        result
                    });
                })
                .catch((error) => {
                    error.status = 400;

                    // next(error);
                });
        }
    },

    bookGetComments: (req, res) => {
        const bookId = req.params.id;
        bookModel.findById(bookId)
            .select('comments')
            .populate(populateCommentsOption)
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

            const updatedBook = await bookModel.findById(bookId)
                .populate(populateGenreOption)
                .populate(populateCommentsOption);
            console.log(updatedBook)


            const user = await userModel.findById(commentCreator);
            user.comments.push(comment._id);
            await user.save();

            res.status(201).json({
                message: "Comment created successfully!",
                book: updatedBook,
                user
            });
        } catch (error) {
            console.log(error);
        }
    }

}