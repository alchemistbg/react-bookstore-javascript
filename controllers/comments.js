const bookModel = require('./../models/Book');
const userModel = require('./../models/User');
const commentModel = require('./../models/Comment');
const mongoose = require('mongoose');

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
    getBookComments: (req, res) => {
        const bookId = req.params.id;
        console.log(bookId);

        bookModel.findById(bookId)
            .then((book) => {
                if (book === null) {
                    return res.status(404).json({
                        message: 'Book not found!'
                    });
                } else {
                    return commentModel.find({ bookCommented: mongoose.Types.ObjectId(bookId) })
                        .populate(populateCommentsOption)
                        .populate({
                            path: 'commentCreator',
                            model: 'user'
                        });
                }
            })
            .then((t) => {
                console.log(t);
                // return t.populate('commentCreator');
            })
            .then((t) => {
                console.log(t);

            })
            .catch((error) => {
                console.error(error);
            });

        // commentModel.find({ bookCommented: mongoose.Types.ObjectId(bookId) })
        //     .then((comments) => {
        //         console.log(comments);
        //         // console.log(book);
        //         // if (book === null) {
        //         //     return res.status(404).json({
        //         //         message: 'Book not found!'
        //         //     });
        //         // } else {
        //         //     console.log(book);
        //         //     book.select(comments).populate(populateCommentsOption);
        //         //     console.log(book);
        //         //     // return book;
        //         // }
        //     })
        //     // .select('comments')
        //     // .populate(populateCommentsOption)
        //     // .then((comments) => {
        //     //     res.status(200).json({
        //     //         message: "Book comments:",
        //     //         comments: comments
        //     //     });
        //     // })
        //     .catch((error) => {
        //         console.error(error);
        //     });

    },

    postBookComment: async (req, res) => {
        console.log(req.params.id);
        console.log(req.body);
        const bookId = req.params.id;
        const { commentCreator, commentContent } = req.body;

        // userModel.findById(commentCreator)
        //     .then((user) => {
        //         console.log(user);
        //         console.log(user.fullName);
        //     })
        //     .catch();

        bookModel.findById().then().catch();
        try {
            const comment = await commentModel({ commentCreator, commentContent, bookCommented: bookId });
            await comment.save();

            const book = await bookModel.findById(bookId);
            book.comments.push(comment._id);
            await book.save();

            const updatedBook = await bookModel.findById(bookId)
                .populate(populateGenreOption)
                .populate(populateCommentsOption);
            console.log(updatedBook);


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