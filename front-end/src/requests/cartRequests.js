import axios from 'axios';
axios.defaults.withCredentials = true;

// const baseUrl = 'http://localhost:3000/routes';
const baseUrl = 'http://localhost:5001/api';

export const getCart = async (userId) => {
    return axios.get(`${baseUrl}/carts/${userId}`, {
        withCredentials: true
    });
}