import { apiUSer } from './axiosInstance';

export const createUser = async (userData) => {
    const response = await apiUSer.post('/users', {
        firstname: userData.prenom,
        lastname: userData.nom,
        email: userData.email,
        birthdate: userData.dateNaissance,
        city: userData.ville,
        postal_code: userData.codePostal,
        password: userData.password,
    });
    return response.data;
};

export const getAllUsers = async () => {
    const response = await apiUSer.get('/users');
    return response.data;
};

export const deleteUser = async (userId, token) => {
    const response = await apiUSer.delete(`/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await apiUSer.post('/login', { email, password });
    return response.data;
};