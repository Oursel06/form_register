import React, { useEffect, useState } from 'react';
import { getAllPosts, deletePost } from '../api/postService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
            toast.success(`Post N°${postId} supprimé.`);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            toast.error("Erreur lors de la suppression du post.");
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="post-list">
            <h2>Liste des posts</h2>
            <div className="post-cards-container">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div className="post-card" key={post._id}>
                            <div className="post-header">
                                <h3>{post.title}</h3>
                                {isAdmin && post.user_id !== currentUserId && (
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(post._id)}
                                        aria-label={`Supprimer le post ${post.title}`}
                                    >
                                        x
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
                                <small>Posté le : {new Date(post.date).toLocaleDateString()} à {new Date(post.date).toLocaleTimeString()}</small>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun post trouvé.</p>
                )}
            </div>

            <style>{`
        .post-list {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .post-cards-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .post-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          background-color: #fff;
        }
        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .post-header h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #333;
        }
        .delete-btn {
          background: #e74c3c;
          border: none;
          color: white;
          font-weight: bold;
          cursor: pointer;
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 1rem;
          transition: background 0.3s ease;
        }
        .delete-btn:hover {
          background: #c0392b;
        }
        .post-description {
          margin: 10px 0;
          color: #555;
          line-height: 1.4;
        }
        .post-image {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        .post-footer {
          font-size: 0.85rem;
          color: #999;
          text-align: right;
        }
      `}</style>
        </div>
    );
};

export default PostList;
