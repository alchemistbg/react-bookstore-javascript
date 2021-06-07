import axios from 'axios';
axios.defaults.withCredentials = true;

// const baseUrl = 'http://localhost:3000/routes';
const baseUrl = 'http://localhost:5001/api';

async function checkIsLogged() {
    // console.log("Check if user is logged in!!!");
    return axios.post(`${baseUrl}/users`, {
        withCredentials: true
    });
}

async function registerUser(registerData, reCaptchaToken) {
    const data = { ...registerData, reCaptchaToken };
    return axios.post(`${baseUrl}/users/register`, data);
}

async function loginUser(loginData) {
    return axios.post(`${baseUrl}/users/login`, loginData, {
        withCredentials: true
    });
}

async function logoutUser() {
    return axios.post(`${baseUrl}/users/logout`, {
        withCredentials: true
    });
}

async function getUserProfile(userId) {
    return axios.get(`${baseUrl}/users/${userId}`, {
        withCredentials: true
    });
}

async function getOrders(userId) {
    return axios.get(`${baseUrl}/users/${userId}/orders`, {
        withCredentials: true
    })
}

async function postOrder(orderData) {
    return axios.post(`${baseUrl}/orders`, orderData);
}

export {
    checkIsLogged,
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    getOrders,
    postOrder
}