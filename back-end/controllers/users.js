const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const userModel = require('../models/User');
const orderModel = require('../models/order');

function validateUserInfo(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Incorrect user data!');
        error.status = 422;
        error.info = errors.array();
        throw error;
    }

    return true;
}

module.exports = {

    register: (req, res) => {
        if (validateUserInfo(req, res)) {
            const { firstName, lastName, userName, password, email, userRole } = req.body;
            userModel.create({ firstName, lastName, userName, password, email, userRole })
                .then((user) => {
                    res.status(201).json({
                        message: 'Registration successful.',
                        userId: user._id,
                        userName
                    });
                })
                .catch((error) => {
                    next(error);
                });
        }
    },

    login: (req, res, next) => {

        if (validateUserInfo(req, res)) {
            const { userName, password } = req.body;

            userModel.findOne({ userName })
                //to use with promise-based password check
                // .then((user) => {
                //     user.matchPassword(password)
                //         .then((match) => {
                //             if (!match) {
                //                 const error = new Error('Wrong password');
                //                 error.statusCode = 401;
                //                 throw error;
                //             }
                //             console.log(match);
                //         })
                //         .catch((error) => {
                //             next(error);
                //         });
                // }

                ////to used with async-based password check
                .then(async (user) => {
                    if (!user) {
                        const error = new Error('User doesn\'t exist!');
                        error.param = 'userName';
                        error.status = 401;
                        throw error;
                    }

                    if (! await user.matchPassword(password)) {
                        const error = new Error('Wrong password!');
                        error.param = 'password';
                        error.status = 401;
                        throw error;
                    }

                    const token = jwt.sign({
                    }, 'verysecretstring', { expiresIn: '24h' });

                    res.status(200).json({
                        message: 'Login successful.',
                        token,
                        userName: user.userName,
                        userId: user._id
                    });
                })
                .catch((error) => {
                    next(error);
                });
        }

    },

    profileRead: (req, res) => {
        const userName = req.params.id;

        userModel.findOne({ userName })
            // .select('firstName lastName userRole username email orders')
            .populate({ path: 'order' })
            .populate({
                path: 'comments',
                select: 'commentContent commentTime',
                // populate: {
                //     path: 'commentCreator',
                //     model: 'user',
                //     select: ('username')
                // },
                populate: {
                    path: 'bookCommented',
                    model: 'book',
                    select: '_id title'
                }
            })
            .then((user) => {
                if (!user) {
                    res.status(400).json({
                        message: "User not found!"
                    });
                    return;
                }
                res.status(200).json({
                    message: "",
                    user,
                });
            })
            .catch();
    },

    profileEdit: (req, res, next) => {
        userModel.findById(req.user.userId).exec()
            .then((user) => {
                if (!user) {
                    return res.status(400).json({});
                }

                let origAddress = { ...user.address };
                origAddress = { ...req.body.address };
                user.address = { ...origAddress };
                return user.save();
            })
            .then((result) => {
                return res.status(200).json({
                    message: "User profile updated successfully",
                });
            })
            .catch((error) => {
                next(error)
            });
    },

    profileDelete: (req, res) => {

    },

    getUserOrders: (req, res) => {
        if (req.user.userRole !== "admin" || req.user.userId !== req.params.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        } else {
            orderModel.find({ customer: req.params.id })
                .populate({
                    path: 'orderedBooks._id',
                    model: 'book',
                    select: 'title price'
                })
                .then((orders) => {
                    return res.status(200).json({
                        message: "OK",
                        orders
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

}