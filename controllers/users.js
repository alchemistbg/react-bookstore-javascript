const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const userModel = require('./../models/User');
const orderModel = require('./../models/Order');

const axios = require('axios');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
// const { ResultWithContext } = require('express-validator/src/chain');
const saltRounds = 10;

const validateUserInfo = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('ERROR: Incorrect user data!');
        error.status = 422;
        error.info = errors.array();
        throw error;
    }

    return true;
}

const validateReCaptchaToken = (token) => {
    const isCaptchaValid = axios.post(`https://google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`)
        .then((response) => {
            return response.data.success;
        })
        .catch((error) => {

        });
    return isCaptchaValid;
}

module.exports = {
    isLogged: (req, res) => {
        res.status(200).json({
            message: "User is still logged in",
            token: req.token
        });
    },

    register: async (req, res) => {
        // const isCaptchaValid = await validateReCaptchaToken(req.body.reCaptchaToken);
        // if (!isCaptchaValid) {
        //     res.status(400).json({
        //         message: "Something went wrong! NON HUMAN"
        //     });
        //     return;
        // }

        // console.log(req.body.reCaptchaToken);\

        if (validateUserInfo(req, res)) {
            const { firstName, lastName, userName, password, email, userRole } = req.body;
            userModel.create({ firstName, lastName, userName, password, email, userRole })
                .then((user) => {
                    return res.status(201).json({
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

                    const userPayload = {
                        userId: user._id,
                        userName: user.userName,
                        userRole: user.userRole
                    }

                    const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '24h' });

                    res.cookie('x-auth-token', token, {
                        httpOnly: true,
                        path: '/',
                        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                    });

                    res.status(200).json({
                        message: 'Login successful.',
                        token,
                    });

                })
                .catch((error) => {
                    next(error);
                });
        }
    },

    logout: (req, res, next) => {
        res.clearCookie('x-auth-token', {
            httpOnly: true,
            path: '/'
        }).status(200).json({ message: 'Logout successfully' });
    },

    patchPassword: (req, res, next) => {

        if (req.user.userId !== req.params.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        const { userId } = req.user;

        let userRawOldPassword = req.body.oldPassword;
        let userHashedOldPassword = undefined;
        let userRawNewPassword = req.body.newPassword;
        let userData = undefined;

        if (validateUserInfo(req, res)) {
            userModel.findById(userId)
                .then((user) => {
                    userData = user;
                    userHashedOldPassword = userData.password;
                    return userData.matchPassword(userRawOldPassword);
                })
                .then((result) => {
                    if (result) {
                        const salt = userData.password.substr(0, 29);
                        return bcrypt.hash(userRawNewPassword, salt);
                    } else {
                        const error = {
                            message: "Wrong current password!",
                            status: 422
                        }
                        throw error;
                    }
                })
                .then((userHashedNewPassword) => {
                    if (userHashedNewPassword === userHashedOldPassword) {
                        const error = {
                            message: "Your new password cannot be same as the current one!",
                            status: 422
                        }
                        throw error;
                    } else {
                        userData.password = userRawNewPassword;
                        return userData.save();
                    }
                })
                .then((result) => {
                    res.status(200).json({
                        message: "Password changed successfully!"
                    });
                })
                .catch((error) => {
                    next(error);
                });
        }
    },

    getProfile: (req, res, next) => {
        console.log(req.user);
        const { userId, userName } = req.user;

        // userModel.findOne({ userName })
        userModel.findById(userId)
            // .select('firstName lastName userRole username email orders')
            // .populate({ path: 'orders' })
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
                    return res.status(400).json({
                        message: "User not found!"
                    });
                }
                return res.status(200).json({
                    message: "",
                    user,
                });
            })
            .catch((error) => {
                // console.error(error);
                next(error);
            });
    },

    patchProfile: (req, res, next) => {

        if (req.user.userId !== req.params.id) {
            return res.status(422).json({
                message: "Unauthorized"
            });
        }

        if (validateUserInfo(req, res)) {
            let userData = { ...req.body };
            userModel.findById(req.user.userId)
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({
                            message: "User not Found!"
                        });
                    }
                    return userModel.findOne({ email: req.body.email });
                })
                .then((result) => {
                    if (result && result._id.toString() !== req.user.userId.toString()) {
                        return res.status(422).json({
                            message: "User with this email already exists!"
                        });
                    } else {
                        return userModel.findOne({ userName: req.body.userName });
                    }
                })
                .then((result) => {
                    if (result && result._id.toString() !== req.user.userId) {
                        return res.status(422).json({
                            message: "User with this username already exists!"
                        });
                    } else {
                        return userModel.updateOne(userData);
                    }
                })
                .then((result) => {
                    return res.status(200).json({
                        message: "Profile updated successfully",
                    });
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                    // next(error);
                });
        }
    },

    deleteProfile: (req, res, next) => {
        if (req.user.userRole !== 'admin') {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        const { profileIdToDelete } = req.body;
        if (profileIdToDelete === req.user.userId) {
            return res.status(405).json({
                message: "Not allowed"
            });
        } else {
            userModel.findOneAndDelete({ _id: profileIdToDelete })
                .then((deletedProfile) => {
                    res.status(200).json({
                        message: "Profile was deleted successfully",
                        deletedProfile
                    });
                })
                .catch((error) => {

                });
        }
    },

    getUserOrders: (req, res) => {
        if (req.user.userRole !== "admin" && req.user.userId !== req.params.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        } else {
            orderModel.find({ customerId: mongoose.Types.ObjectId(req.user.userId) })
                .populate({
                    path: 'orderedBooks._id',
                    model: 'book',
                    select: 'title price'
                })
                .then((orders) => {
                    console.log("orders: ", orders);
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