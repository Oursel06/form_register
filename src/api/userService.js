import { apiPost, apiUser } from './axiosInstance';

export const createUser = async (userData) => {
    const response = await apiUser.post('/users', userData);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await apiUser.get('/users');
    return response.data;
};

export const deleteUser = async (userId, token) => {
    const response = await apiUser.delete(`/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await apiUser.post('/login', { email, password });
    return response.data;
};

export const getPostsByUser = async (userId) => {
    const response = await apiPost.get(`/posts/user/${userId}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des postes de l'utilisateur");
    return response.json();
};