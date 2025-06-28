import React, { useEffect, useState } from 'react';
import { getAllPosts, deletePost } from '../api/postService';
import { getPostsByUser } from '../api/userService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import MenuPost from './MenuPost';
import '../styles/PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const token = localStorage.getItem('token');
        let decoded = null;

        if (token) {
            decoded = jwtDecode(token);
            setIsAdmin(decoded.is_admin);
            setCurrentUserId(decoded.id);
        }

        const fetchPosts = async () => {
            setLoading(true);
            try {
                let postList = [];
                if (filter === "mine" && decoded?.id) {
                    postList = await getPostsByUser(decoded.id);
                } else {
                    postList = await getAllPosts();
                }
                setPosts(postList);
            } catch (error) {
                toast.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [filter]);    

    const handleDelete = async (postId) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce post ?")) return;

        try {
            const token = localStorage.getItem('token');
            await deletePost(postId, token);
            toast.success(`Post N°${postId} supprimé.`);
            setPosts(posts.filter(p => p._id !== postId));
        } catch {
            toast.error("Erreur lors de la suppression du post.");
        }
    };

    const filteredPosts = posts
        .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(post => filter === "mine" ? post.user_id === currentUserId : true);

    return (
        <div className="post-page-layout">
            <MenuPost onSelect={setFilter} />
            <div className="post-list-container">
                {loading ? (
                    <div className="loader-container">
                        <div className="spinner" />
                    </div>
                ) : (
                    <>
                        <h2>
                            {filter === "mine"
                                    ? `${filteredPosts.length <= 1 ? 'Mon poste' : `Liste de mes ${filteredPosts.length} postes`}`
                                    : `${filteredPosts.length <= 1 ? 'Affichage du poste' : `Liste des ${filteredPosts.length} postes`}`}
                        </h2>
                        <div className="search-wrapper">
                            <input
                                type="text"
                                placeholder="Rechercher par titre…"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        {filteredPosts.length === 0 ? (
                            <p>Aucun post trouvé.</p>
                        ) : (
                            <div className="post-cards">
                                {filteredPosts.map(post => (
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
                    </>
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
