import axios from 'axios';

export const apiUser = axios.create({
    baseURL: 'https://form-register-back.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiPost = axios.create({
    baseURL: 'https://form-register-back-mongo.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

