import axios from 'axios';

export const apiUSer = axios.create({
    baseURL: process.env.REACT_APP_API_URL_USER,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiPost = axios.create({
    baseURL: process.env.REACT_APP_API_URL_POST,
    headers: {
        'Content-Type': 'application/json',
    },
});

