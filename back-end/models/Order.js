const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        get: v => v.toString(),
        required: true
    },
    orderedBooks: [{
        bookId: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            get: v => v.toString()
        },
        price: Number,
        qty: Number,
        totalPrice: Number
    }],
    orderTotalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Processing', 'Packed', 'Sent', 'Canceled', 'Completed'],
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;