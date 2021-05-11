const orderModel = require('../models/order');
const userModel = require('../models/User');

const mongoose = require('mongoose');

module.exports = {

    postOrder: (req, res, next) => {
        const { customer, orderedBooks, totalPrice } = req.body;
        orderModel.create({ customer, orderedBooks, totalPrice })
            .then((order) => {
                res.status(201).json({
                    message: "Successful order.",
                    order
                });
            })
            .catch((error) => {
                error.status = 400;

                next(error);
            });
    },

    getOrders: (req, res, next) => {
        if (req.user.userRole !== 'admin') {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }
        orderModel.find({})
            .populate({
                path: 'customer',
                model: 'user',
                select: ('userName')
            })
            .populate({
                path: 'orderedBooks._id',
                model: 'book',
                select: 'title price'
            })
            .then((orders) => {
                res.status(200).json({
                    message: "OK",
                    orders
                });
            })
            .catch((error) => {
                error.status = 400;

                next(error);
            });
    },

    getOrders: (req, res) => {
        // orderModel.find({ customer: req.body.userId })
        // .populate({
        //     path: 'customer',
        //     model: 'user',
        //     select: ('userName')
        // })
        // .populate({
        //     path: 'orderedBooks._id',
        //     model: 'book',
        //     select: 'title price'
        // })
        // .then((orders) => {
        //     res
        //         .status(200)
        //         .json({
        //             orders
        //         });
        // })
        // .catch();
    },

    getOrder: (req, res, next) => {
        const orderId = req.params.id;

        orderModel.findById(orderId)
            .then((order) => {
                if (!order) {
                    return res.status(444).json({
                        message: "Order was not found!"
                    });
                } else {
                    if (req.user.userId !== order.customer || req.user.userRole !== 'admin') {
                        return res.status(403).json({
                            message: "Unauthorized"
                        });
                    }

                    return res.status(200).json({
                        message: "Order OK",
                        order
                    });
                }
            })
            .catch((error) => {
                error.status = 488;

                next(error);
            });
    },

    //     orderModel.findById(orderId)
    //         .then((order) => {
    //             console.log(order)
    //         })
    //         .catch();
    // }
}