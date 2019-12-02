const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const userModel = require('../models/user');

function validateUserInfo(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({
            message: 'Incorrect user data',
            errors: errors.array()
        });
        return false;
    }

    return true;
}

module.exports = {

    register: (req, res) => {

        if (validateUserInfo(req, res)) {
            const { username, password, email, userRole } = req.body;
            userModel.create({ username, password, email, userRole })
                .then((user) => {
                    res.status(201).json({
                        message: 'User registered successfully',
                        userId: user._id
                    });
                })
                .catch((error) => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    next(error);
                    // error = new Error('Internal server error!');
                    // error.statusCode = 500;
                    // throw error;
                    // next(error);
                });
        }
    },

    login: (req, res, next) => {
        const { username, password } = req.body;

        userModel.findOne({ username })
            //to used with promise-based password check
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
                    const error = new Error('User doesn\'t exist');
                    error.statusCode = 401;
                    throw error;
                }

                if (! await user.matchPassword(password)) {
                    const error = new Error('Wrong password');
                    error.statusCode = 401;
                    throw error;
                }

                const token = jwt.sign({
                }, 'verysecretstring', { expiresIn: '1h' });

                res.status(200).json({
                    message: 'User logged in successfully',
                    token,
                    userId: user._id.toString(),
                    username: user.username,
                    userRole: user.userRole
                });
                console.log(token);
            })
            .catch((error) => {
                next(error);
            });
    },

    profileRead: (req, res) => {
        const userId = req.params.id;

        userModel.findById(userId)
            .select('userRole username email orders')
            .populate({ path: 'order' })
            .then((user) => {
                res.status(200).json({
                    message: "",
                    user
                });
            })
            .catch();
    },

    profileEdit: (req, res) => {

    },

    profileDelete: (req, res) => {

    },

}