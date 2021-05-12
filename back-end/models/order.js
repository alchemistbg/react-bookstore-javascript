const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        get: v => v.toString()
    },
    orderedBooks: [{
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