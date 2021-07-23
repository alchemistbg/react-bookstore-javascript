import * as yup from 'yup';

const c = {
    userName: {
        required: 'Username is required!',
        length: 'Username must be between 5 and 20 characters long!',
        match: 'Username must contains only latin letters and digits!'
    },
    password: {
        required: 'Password is required!',
        length: 'Password must be between 8 and 20 characters long!',
        match: 'Password must contains only latin letters and digits!',
        oldRequired: 'Old password is required!',
        newRequired: 'New password is required!',
        repNewRequired: 'Repeat new password is required',
    },
    email: {
        required: 'Email is required!',
        valid: 'Please provide a valid email!'
    },
    names: {
        fNameRequired: 'First name is required!',
        lNameRequired: 'Last name is required!'
    }
}

const loginFormSchema = yup.object().shape({
    userName: yup
        .string()
        .required(c.userName.required)
        .min(5, c.userName.length)
        .max(20, c.userName.length)
        .matches(/^[\w]*$/, c.userName.match),
    password: yup
        .string()
        .required(c.password.required)
        .min(8, c.password.length)
        .max(20, c.password.length)
        .matches(/^[\w]*$/, c.password.match)
});

const registerFormSchema = yup.object().shape({
    userName: yup
        .string()
        .required(c.userName.required)
        .min(5, c.userName.length)
        .max(20, c.userName.length)
        .matches(/^[\w]*$/, c.userName.match),
    email: yup
        .string()
        .required(c.email.required)
        .email(c.email.valid),
    firstName: yup
        .string()
        .required(c.names.fNameRequired),
    lastName: yup
        .string()
        .required(c.names.lNameRequired),
    password: yup
        .string()
        .required(c.password.required)
        .min(8, c.password.length)
        .max(20, c.password.length)
        .matches(/^[\w]*$/, c.password.match),
    repeatPassword: yup
        .string()
        .required('Repeat password is required!')
        .oneOf([yup.ref('password'), null], 'Both password fields must match')
});

const changePasswordFormSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required(c.password.oldRequired)
        .min(8, c.password.length)
        .max(20, c.password.length)
        .matches(/^[\w]*$/, c.password.match),
    newPassword: yup
        .string(c.password.newRequired)
        .required(c.password.newRequired)
        .min(8, c.password.length)
        .max(20, c.password.length)
        .matches(/^[\w]*$/, c.password.match),
    repNewPassword: yup
        .string()
        .required(c.password.repNewRequired)
        .min(8, c.password.length)
        .max(20, c.password.length)
        .matches(/^[\w]*$/, c.password.match)
        .oneOf([yup.ref('newPassword'), null], 'Both password fields must match'),
});

export {
    loginFormSchema,
    registerFormSchema,
    changePasswordFormSchema
}