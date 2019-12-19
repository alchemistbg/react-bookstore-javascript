const orderModel = require('../models/order');
const userModel = require('../models/User');

const mongoose = require('mongoose');

module.exports = {

    orderAdd: (req, res) => {
        const userId = req.body.userId;

        const customer = mongoose.mongo.ObjectId(userId);
        orderModel.create({ customer })
            .then((order) => {

                userModel.findById(userId)
                    .populate({ path: 'order' })
                    .select('username orders')
                    .then((user) => {

                        user.orders.push(order._id);
                        user.save();

                        res.status(201).json({
                            message: "Order created",
                            order,
                            user
                        })
                    })
                // .catch();
            })
            .catch();
    },

    getOrders: (req, res) => {

        const customerId = req.body.userId;

        orderModel.find()
            .populate({ path: 'customer', select: '_id' })
            .then((orders) => {
                res
                    .status(200)
                    .json({
                        orders
                    });
            })
            .catch();
    },

    getOrderById: (req, res) => {
        const orderId = req.params.id;

        orderModel.findById(orderId)
            .then((order) => {
                console.log(order)
            })
            .catch();

    }
}