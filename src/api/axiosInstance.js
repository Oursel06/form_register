import axios from 'axios';

export const apiUSer = axios.create({
    baseURL: 'https://form-register-back.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiPost = axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
    },
});

