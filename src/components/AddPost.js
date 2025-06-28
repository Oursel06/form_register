import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/AddPost.css';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return toast.error("Non autorisé");

        const user_id = jwtDecode(token).id;

        try {
            await axios.post('https://form-register-back-mongo.vercel.app/posts', {
                title,
                description,
                imageUrl,
                user_id,
            });
            toast.success("Post créé avec succès !");
            navigate('/form_register/home?view=posts');
        } catch (error) {
            toast.error("Erreur lors de la création du post.");
        }
    };

    return (
        <div className="form-container">
            <h2>Créer un nouveau post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="URL de l'image (facultatif)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <div className="form-buttons">
                    <button type="button" className="back-button" onClick={() => navigate(-1)}>Retour</button>
                    <button type="submit" className="submit-button">Publier</button>
                </div>
            </form>
        </div>
    );
};

export default AddPost;
