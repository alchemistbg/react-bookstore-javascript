import axios from 'axios';
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:5001/api/carts';
// const baseUrl = `https://mern-bookstore.herokuapp.com/api/carts`;

export const getCart = async (userId) => {
    return axios.get(`${baseUrl}/${userId}`, {
        withCredentials: true
    });
}

export const postCart = async (userId, cartData) => {
    return axios.post(`${baseUrl}/${userId}`, cartData, {
        withCredentials: true
    });
}

export const deleteCart = async (userId) => {
    return axios.delete(`${baseUrl}/${userId}`, {
        withCredentials: true
    });
}