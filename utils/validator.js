const { check } = require('express-validator');
const userModel = require('./../models/User');

function loginDataValidator() {
    return [
        check('userName')
            .isLength({ min: 5, max: 20 }).withMessage('Username must be between 5 and 20 characters long!')
            .isAlphanumeric().withMessage('Username must contains only latin letters and digits!')
            .custom(async (username, { req }) => {
                const user = await userModel.findOne({ userName: username });
                if (!user) {
                    return Promise.reject('User with this username does not exists!');
                }
            }),
        check('password')
            .isLength({ min: 8 }).withMessage('Password must at least 8 symbols long!')
            .isAlphanumeric().withMessage('Password must contains only latin letters and digits!')
    ]
}

function registrationDataValidator() {
    return [
        check('userName')
            .isLength({ min: 5, max: 20 }).withMessage('Username must be between 5 and 20 characters long!')
            .isAlphanumeric().withMessage('Username must contains only latin letters and digits!')
            .custom(async (username, { req }) => {
                const user = await userModel.findOne({ userName: username });
                if (user) {
                    return Promise.reject('User with this username is already registered!');
                }
            }),
        check('email')
            .isEmail().withMessage('Email must be a valid email address!')
            .custom(async (email, { req }) => {
                const user = await userModel.findOne({ email });
                if (user) {
                    return Promise.reject('User with this email address is already registered!');
                }
            }),
        check('password')
            .isLength({ min: 8 }).withMessage('Password must at least 8 symbols long!')
            .isAlphanumeric().withMessage('Password must contains only latin letters and digits!')
            .custom((password, { req }) => {
                if (req.body.repeatPassword.length < 8) {
                    throw new Error(`Repeat password field can't be empty!`);
                }
                if (password !== req.body.repeatPassword) {
                    throw new Error(`Password and Repeat-Password don't match! ${password} vs. ${req.body.repeatPassword}`);
                } else {
                    return password;
                }
            }),
        // check('repeatPassword')
        //     .isLength({ min: 8 }).withMessage('Repeat password must at least 8 symbols long!')
        //     .isAlphanumeric().withMessage('Repeat password must contains only letters and digits!')
    ];
}

module.exports = {
    registrationDataValidator,
    loginDataValidator
}