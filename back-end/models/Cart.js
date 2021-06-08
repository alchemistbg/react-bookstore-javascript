const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        get: v => v.toString()
    },
    selectedBooks: [{
        bookId: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            get: v => v.toString()
        },
        qty: Number,
        totalPrice: Number
    }],
    totalPrice: {
        type: Number
    }
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;