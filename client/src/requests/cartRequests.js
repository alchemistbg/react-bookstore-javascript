import { BASE_URL } from './../utils/constants.js';

import axios from 'axios';
axios.defaults.withCredentials = true;

export const getCart = async (userId) => {
    return axios.get(`${BASE_URL}/${userId}`, {
        withCredentials: true
    });
}

export const postCart = async (userId, cartData) => {
    return axios.post(`${BASE_URL}/${userId}`, cartData, {
        withCredentials: true
    });
}

export const deleteCart = async (userId) => {
    return axios.delete(`${BASE_URL}/${userId}`, {
        withCredentials: true
    });
}