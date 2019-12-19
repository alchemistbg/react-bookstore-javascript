// import * as yup from 'yup';

import { loginFormSchema } from './inputSchemas';

const parseErrors = (error) => {
    const errors = error.inner.reduce((acc, { path, message }) => {
        acc[path] = (acc[path] || []).concat(message);
        return acc;
    }, {});
    return errors;
}

const validateForm = (form, data) => {
    if (form === 'login') {
        return loginFormSchema
            .validate(data, { abortEarly: false })
            .then(() => {
                return data;
            })
            .catch((error) => {
                return Promise.reject(parseErrors(error));
            });
    }
}

const validateInput = (form, inputName, inputData) => {
    if (form === 'login') {
        return loginFormSchema
            .validateAt(inputName, inputData, { abortEarly: false })
            .then(() => {
                return inputData;
            })
            .catch((error) => {
                return Promise.reject(parseErrors(error));
            });
    }
}

export {
    validateForm,
    validateInput,
}