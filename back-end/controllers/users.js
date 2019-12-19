const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const userModel = require('../models/User');


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
            // console.log(req.body)
            const { firstname, lastname, username, password, email, userRole } = req.body;
            userModel.create({ firstname, lastname, username, password, email, userRole })
                .then((user) => {
                    res.status(201).json({
                        message: 'Registration successful.',
                        userId: user._id,
                        username
                    });
                })
                .catch((error) => {
                    next(error);
                });
        }
    },

    login: (req, res, next) => {
        const { username, password } = req.body;

        userModel.findOne({ username })
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
                    error.param = 'username';
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
                    // userId: user._id.toString(),
                    username: user.username,
                    // userRole: user.userRole
                });
                // console.log(token);
            })
            .catch((error) => {
                next(error);
            });
    },

    profileRead: (req, res) => {
        const userName = req.params.id;

        userModel.findOne({ userName })
            // .select('firstName lastName userRole username email orders')
            .populate({ path: 'order' })
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

    profileEdit: (req, res) => {

    },

    profileDelete: (req, res) => {

    },

}