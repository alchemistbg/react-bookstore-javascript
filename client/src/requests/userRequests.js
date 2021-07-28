import { BASE_URL } from './../utils/constants.js';

import axios from 'axios';
axios.defaults.withCredentials = true;

console.log(BASE_URL);

async function checkIsLogged() {
    // console.log("Check if user is logged in!!!");
    return axios.post(`${BASE_URL}/users`, {
        withCredentials: true
    });
}

async function registerUser(registerData, reCaptchaToken) {
    const data = { ...registerData, reCaptchaToken };
    return axios.post(`${BASE_URL}/users/register`, data);
}

async function loginUser(loginData) {
    return axios.post(`${BASE_URL}/users/login`, loginData, {
        withCredentials: true
    });
}

async function logoutUser() {
    return axios.post(`${BASE_URL}/users/logout`, {
        withCredentials: true
    });
}

async function patchPassword(userId, passData) {
    return axios.patch(`${BASE_URL}/users/${userId}/pass`, passData, {
        withCredentials: true
    });
}

async function getUserProfile(userId) {
    return axios.get(`${BASE_URL}/users/${userId}`, {
        withCredentials: true
    });
}

async function patchUserProfile(userId, formData) {
    return axios.patch(`${BASE_URL}/users/${userId}`, formData, {
        withCredentials: true
    });
}

async function getOrders(userId) {
    return axios.get(`${BASE_URL}/users/${userId}/orders`, {
        withCredentials: true
    })
}

async function postOrder(orderData) {
    return axios.post(`${BASE_URL}/orders`, orderData);
}

export {
    checkIsLogged,
    registerUser,
    loginUser,
    logoutUser,
    patchPassword,
    getUserProfile,
    patchUserProfile,
    getOrders,
    postOrder
}