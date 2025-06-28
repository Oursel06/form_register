import { apiPost } from "./axiosInstance";

export const createPost = async (postData) => {
    const response = await apiPost.post('/posts', {
        title: postData.title,
        description: postData.description,
        user_id: postData.user_id,
        imageUrl: postData.imageUrl,
    });
    return response.data;
};

export const getAllPosts = async () => {
    const response = await apiPost.get('/posts');
    return response.data;
};

export const deletePost = async (postId, token) => {
    const response = await apiPost.delete(`/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};
