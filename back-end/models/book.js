const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'genre'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
    // qty: {
    //     type: Number,
    //     default: 0
    // },
    // salesRating: {
    //     type: Number,
    //     default: 0.0
    // },
    // votesRating: {
    //     type: Number,
    //     default: 0.0
    // },
    // comments: {

    // }
});

module.exports = mongoose.model('book', bookSchema);