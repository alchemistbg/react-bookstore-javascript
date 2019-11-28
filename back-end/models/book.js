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
    genres: {
        type: String,
        required: true
    },
    // votesRating: {},
    // salesRating: {},
    // price: {},
    // qty: {},
    // comments: {}
});

module.exports = mongoose.model('book', bookSchema);