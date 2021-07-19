const { check } = require('express-validator');
const userModel = require('./../models/User');

// Following object will hold all the params used for input validation!
const c = {
    userName: {
        lengthMin: 5,
        lengthMax: 20,
        messageLength: 'Username must be between 5 and 20 characters long!',
        messageAlphaNum: 'Username must contains only latin letters and digits!',
        messageCustomNotExists: 'User with this username does not exists!',
        messageCustomRegistered: 'User with this username is already registered!',
    },
    password: {
        lengthMin: 8,
        lengthMax: 20,
        messageLength: 'Password must be between 8 and 20 characters long!',
        messageAlphaNum: 'Password must contains only latin letters and digits!',
        messageCustomEmpty: `Repeat password field can't be empty!`,
        messageCustomDiff: `Password and Repeat-Password don't match!`,
        // messageCustomNotMatch: `Password and Repeat- Password don't match! ${password} vs. ${req.body.repeatPassword}`
    },
    email: {
        messageIsValid: 'Email must be a valid email address!',
        messageCustomRegistered: 'User with this email address is already registered!',
    }
};

function loginDataValidator() {
    return [
        check('userName')
            .isLength({ min: c.userName.lengthMin, max: c.userName.lengthMax }).withMessage(c.userName.messageLength)
            .isAlphanumeric().withMessage(c.userName.messageAlphaNum)
            .custom(async (username, { req }) => {
                const user = await userModel.findOne({ userName: username });
                if (!user) {
                    return Promise.reject(c.userName.messageCustomNotExists);
                }
            }),
        check('password')
            .isLength({ min: c.password.lengthMin, max: c.password.lengthMax }).withMessage(c.password.messageLength)
            .isAlphanumeric().withMessage(c.password.messageAlphaNum)
    ]
}

function registrationDataValidator() {
    return [
        check('userName')
            .isLength({ min: c.userName.lengthMin, max: c.userName.lengthMax }).withMessage(c.userName.messageLength)
            .isAlphanumeric().withMessage(c.userName.messageAlphaNum)
            .custom(async (username, { req }) => {
                const user = await userModel.findOne({ userName: username });
                if (user) {
                    return Promise.reject(c.userName.messageCustomRegistered);
                }
            }),
        check('email')
            .isEmail().withMessage(c.email.messageIsValid)
            .custom(async (email, { req }) => {
                const user = await userModel.findOne({ email });
                if (user) {
                    return Promise.reject(c.email.messageCustomRegistered);
                }
            }),
        check('password')
            .isLength({ min: c.password.lengthMin, max: c.password.lengthMax }).withMessage(c.password.messageLength)
            .isAlphanumeric().withMessage(c.password.messageAlphaNum)
            .custom((password, { req }) => {
                if (req.body.repeatPassword.length < 8) {
                    throw new Error(c.password.messageCustomEmpty);
                }
                if (password !== req.body.repeatPassword) {
                    throw new Error(`${c.password.messageCustomDiff} ${password} vs. ${req.body.repNewPassword}`);
                } else {
                    return password;
                }
            }),
        // check('repeatPassword')
        //     .isLength({ min: 8 }).withMessage('Repeat password must at least 8 symbols long!')
        //     .isAlphanumeric().withMessage('Repeat password must contains only letters and digits!')
    ];
}

function newPasswordDataValidator() {
    return [
        check('oldPassword')
            .isLength({ min: c.password.lengthMin, max: c.password.lengthMax }).withMessage(c.password.messageLength)
            .isAlphanumeric().withMessage(c.password.messageAlphaNum),
        check('newPassword')
            .isLength({ min: c.password.lengthMin, max: c.password.lengthMax }).withMessage(c.password.messageLength)
            .isAlphanumeric().withMessage(c.password.messageAlphaNum)
            .custom((password, { req }) => {
                if (req.body.repNewPassword.length < c.password.lengthMin) {
                    throw new Error(c.password.messageCustomEmpty);
                }

                if (password !== req.body.repNewPassword) {
                    throw new Error(`${c.password.messageCustomDiff} ${password} vs. ${req.body.repNewPassword}`);
                } else {
                    return password;
                }
            }),
    ];
}

module.exports = {
    registrationDataValidator,
    loginDataValidator,
    newPasswordDataValidator
}