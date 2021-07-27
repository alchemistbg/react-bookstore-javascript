const { check } = require('express-validator');
const userModel = require('./../models/User');

// Following object will hold all the params and messages used for input validation!
const m = {
    firstName: {
        notEmpty: 'First name is required and must not be empty!'
    },
    lastName: {
        notEmpty: 'Last name is required and must not be empty!'
    },
    userName: {
        lengthMin: 5,
        lengthMax: 20,
        messageLength: 'Username must be between 5 and 20 characters long!',
        messageAlphaNum: 'Username must contains only latin letters and digits!',
        messageCustomNotExists: 'User with this username does not exists!',
        messageCustomRegistered: 'User with this username is already registered! GFYS',
    },
    email: {
        messageIsValid: 'Email must be a valid email address!',
        messageCustomRegistered: 'User with this email address is already registered!',
    },
    password: {
        lengthMin: 8,
        lengthMax: 20,
        messageLength: 'Password must be between 8 and 20 characters long!',
        messageAlphaNum: 'Password must contains only latin letters and digits!',
        messageCustomEmpty: `Repeat password field can't be empty!`,
        messageCustomDiff: `Password and Repeat-Password don't match!`,
        // messageCustomNotMatch: `Password and Repeat- Password don't match! ${password} vs. ${req.body.repeatPassword}`
    }
};

// Following object will hold all the helper validation functions used for input validation!
const hVF = {
    customCheckUserName: async (username, { req }) => {
        const user = await userModel.findOne({ userName: username });
        if (req.originalUrl.includes('login') && !(user)) {
            return Promise.reject(m.userName.messageCustomNotExists);
        }

        if (req.originalUrl.includes('register') && user) {
            return Promise.reject(m.userName.messageCustomRegistered);
        }

        if ((req.originalUrl === `/api/users/${req.params.id}/`) && req.method === 'PATCH') {
            if (req.params.id !== req.user.userId) {
                return Promise.reject(m.userName.messageCustomRegistered);
            }
        }
    },
    customCheckPassword: (password, { req }) => {
        if (req.originalUrl.includes('login')) {
            return true;
        }

        if (req.originalUrl.includes('register')) {
            if (req.body.repeatPassword.length < 8) {
                throw new Error(m.password.messageCustomEmpty);
            }
            if (password !== req.body.repeatPassword) {
                throw new Error(`${m.password.messageCustomDiff} ${password} vs. ${req.body.repNewPassword}`);
            } else {
                return password;
            }
        }

        if (req.originalUrl.includes(`/users/${req.params.id}/pass`) && req.method === 'PATCH') {
            if (req.body.repNewPassword.length < m.password.lengthMin) {
                throw new Error(m.password.messageCustomEmpty);
            }

            if (password !== req.body.repNewPassword) {
                throw new Error(`${m.password.messageCustomDiff} ${password} vs. ${req.body.repNewPassword}`);
            } else {
                return password;
            }
        }
    },
    customCheckEmail: async (email, { req }) => {
        const user = await userModel.findOne({ email });
        if (req.originalUrl.includes('register') && user) {
            return Promise.reject(m.email.messageCustomRegistered);
        }

        if (req.originalUrl.includes(`/users/${req.params.id}/`) && req.method === 'PATCH') {
            if (user && user._id.toString() !== req.params.id) {
                return Promise.reject(m.email.messageCustomRegistered);
            }
        }
    }
}

// Following object will hold all the main validation functions used for input validation!
const mVF = {
    checkFirstName: check('firstName').notEmpty().withMessage(m.firstName.notEmpty),
    checkLastName: check('lastName').notEmpty().withMessage(m.lastName.notEmpty),
    checkUsername: check('userName')
        .isLength({ min: m.userName.lengthMin, max: m.userName.lengthMax }).withMessage(m.userName.messageLength)
        .isAlphanumeric().withMessage(m.userName.messageAlphaNum)
        .custom(hVF.customCheckUserName),
    checkPassword: check('password')
        .isLength({ min: m.password.lengthMin, max: m.password.lengthMax }).withMessage(m.password.messageLength)
        .isAlphanumeric().withMessage(m.password.messageAlphaNum)
        .custom(hVF.customCheckPassword),
    checkEmail: check('email')
        .isEmail().withMessage(m.email.messageIsValid)
        .custom(hVF.customCheckEmail)
}

const loginDataValidator = () => {
    return [
        mVF.checkUsername,
        mVF.checkPassword
    ]
}

const registrationDataValidator = () => {
    return [
        mVF.checkFirstName,
        mVF.checkLastName,
        mVF.checkUsername,
        mVF.checkEmail,
        mVF.checkPassword,
    ];
}

const patchProfileValidator = () => {
    return [
        mVF.checkFirstName,
        mVF.checkLastName,
        mVF.checkUsername,
        mVF.checkEmail,
    ]
}

const patchPasswordDataValidator = () => {
    return [
        check('oldPassword')
            .isLength({ min: m.password.lengthMin, max: m.password.lengthMax }).withMessage(m.password.messageLength)
            .isAlphanumeric().withMessage(m.password.messageAlphaNum),
        check('newPassword')
            .isLength({ min: m.password.lengthMin, max: m.password.lengthMax }).withMessage(m.password.messageLength)
            .isAlphanumeric().withMessage(m.password.messageAlphaNum)
            .custom(hVF.customCheckPassword),
    ];
}


module.exports = {
    registrationDataValidator,
    loginDataValidator,
    patchProfileValidator,
    patchPasswordDataValidator
}