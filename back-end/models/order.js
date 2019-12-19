const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItem: [{
        type: Schema.Types.ObjectId,
        ref: 'orderItem'
    }]
});


const Order = mongoose.model('order', orderSchema);
module.exports = Order;