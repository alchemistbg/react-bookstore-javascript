import * as yup from 'yup';

const loginFormSchema = yup.object().shape({
    userName: yup
        .string()
        .required('Username is required!')
        .min(5, 'Username must be between 5 and 20 characters long!')
        .max(20, 'Username must be between 5 and 20 characters long!')
        .matches(/^[\w]*$/, 'Username must contains only latin letters and digits!'),
    password: yup
        .string()
        .required('Password is required!')
        .min(5, 'Password must at least 8 symbols long!')
        .max(20, 'Password must at least 8 symbols long!')
        .matches(/^[\w]*$/, 'Password must contains only latin letters and digits!')
});

const registerFormSchema = yup.object().shape({

});

export {
    loginFormSchema
}