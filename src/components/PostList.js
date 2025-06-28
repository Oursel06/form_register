import React, { useEffect, useState } from 'react';
import { getAllPosts, deletePost } from '../api/postService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import MenuPost from './MenuPost'; // 👈 Import ici
import '../styles/PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setIsAdmin(decoded.is_admin);
            setCurrentUserId(decoded.user_id);
        }

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const postList = await getAllPosts();
                setPosts(postList);
            } catch (error) {
                toast.error("Erreur lors de la récupération des posts, veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce post ?")) return;

        try {
            const token = localStorage.getItem('token');
            await deletePost(postId, token);
            toast.success(`Post ${postId} supprimé.`);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            toast.error("Erreur lors de la suppression du post.");
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div className="post-page-layout">
            <MenuPost />
            <div className="post-list-container">
                <h2>Liste des postes</h2>
                {posts.length === 0 ? (
                    <p>Aucun post trouvé.</p>
                ) : (
                    <div className="post-cards">
                        {posts.map(post => (
                            <div className="post-card" key={post._id}>
                                <div className="post-card-header">
                                    <h3>{post.title}</h3>
                                    {isAdmin && post.user_id !== currentUserId && (
                                        <button
                                            className="delete-btn-post"
                                            onClick={() => handleDelete(post._id)}
                                            aria-label={`Supprimer le post ${post.title}`}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                                <p className="post-description">{post.description}</p>
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt={`Illustration de ${post.title}`}
                                        className="post-image"
                                    />
                                )}
                                <div className="post-footer">
                                    <small>
                                        Posté le : {new Date(post.createdAt || post.date).toLocaleDateString()} à {new Date(post.createdAt || post.date).toLocaleTimeString()}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    className="add-post-button"
                    onClick={() => window.location.href = "/add-post"}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default PostList;
