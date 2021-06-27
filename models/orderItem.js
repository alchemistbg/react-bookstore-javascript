const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItem = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'book',
    },
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = orderItem;