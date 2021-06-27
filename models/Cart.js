const mongoose = require('mongoose');
const { collection } = require('./User');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        get: v => v.toString(),
        required: true
    },
    selectedBooks: [{
        bookId: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            get: v => v.toString()
        },
        price: Number,
        qty: Number,
        totalPrice: Number
    }],
    cartTotalPrice: {
        type: Number,
        default: 0,
        required: true
    }
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;