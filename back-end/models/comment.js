const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentCreator: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    bookCommented: {
        type: Schema.Types.ObjectId,
        ref: 'book'
    },
    commentTime: {
        type: Date,
        default: Date.now
    },
    commentContent: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('comment', commentSchema)