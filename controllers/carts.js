const { response } = require("express");
const mongoose = require('mongoose');

const cartModel = require('./../models/Cart');
const { bookPropFilter, cartPriceCalculator } = require('./../utils');

const patchCart = (req, res, next, cart) => {
    // console.log("patchCart: ", cart);
    const customerId = cart.customerId;
    cartModel.updateOne({ customerId }, cart)
        .then((cartToUp) => {
            // console.log("To update", cartToUp);
        })
        .catch((error) => {

        });
}

module.exports = {
    postCart: (req, res, next) => {
        const customerId = req.user.userId;
        const cartTotalPrice = 0;

        const selectedBooks = bookPropFilter(req.body, ['_id', 'qty', 'price', 'totalPrice']);

        const cartData = {
            customerId,
            selectedBooks,
            cartTotalPrice,
        }

        cartModel
            .find({ customerId })
            .then((cart) => {
                if (cart.length === 0) {
                    cartData.cartTotalPrice = cartPriceCalculator(selectedBooks);
                    return cartModel.create(cartData);
                } else {
                    cart[0].selectedBooks = [...selectedBooks];
                    cart[0].cartTotalPrice = cartPriceCalculator(selectedBooks);
                    console.log(cart[0].cartTotalPrice)
                    return patchCart(req, res, next, cart[0]);
                }
            })
            .then((cart) => {
                return res.status(200).json({
                    cart
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    getCart: (req, res, next) => {
        console.log(req.user);
        const customerId = req.user.userId;
        cartModel
            .find({ customerId })
            .populate({
                path: 'customerId',
                model: 'user',
                select: 'userName'
            })
            .populate({
                path: 'selectedBooks._id',
                model: 'book',
                select: 'title'
            })
            .then((cart) => {
                if (cart.length === 0) {
                    // if (!cart) {
                    return res.status(404).json({
                        message: "The cart is empty"
                    });
                } else {
                    console.log("CART: ", cart)
                    res.status(200).json({
                        message: "Get Cart test OK!",
                        cart: cart
                    });
                }
            })
            .catch((error) => {

            });
    },

    deleteCart: (req, res) => {
        // console.log(req.params);
        // console.log(req.user);
        cartModel.findOneAndDelete({ customerId: req.user.userId })
            .then((result) => {
                console.log(result);
                res.status(204).json({
                    message: 'Deleted'
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Problems'
                });
            });
    }
}