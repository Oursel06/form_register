import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../api/userService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setIsAdmin(decoded.is_admin);
            setCurrentUserEmail(decoded.email);
        }

        const fetchUsers = async () => {
            setLoading(true);
            try {
                const userList = await getAllUsers();
                setUsers(userList);
            } catch (error) {
                toast.error("Une erreur est survenue lors de la récupération des utilisateurs, veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

        try {
            const token = localStorage.getItem('token');
            await deleteUser(userId, token);
            toast.success(`Utilisateur N°${userId} supprimé.`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            toast.error("Erreur lors de la suppression de l'utilisateur.");
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
        <div className='user-list'>
            <h2>Liste des utilisateurs</h2>
            <div className="user-cards-container">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div className="user-card" key={user.id}>
                            <div className="name">
                                {user.firstname || user.nom} {user.lastname || user.prenom}
                            </div>
                            <div className="user-info">
                                <label>Date de naissance:</label>
                                <div className="data">{user.birthdate || user.dateNaissance}</div>
                            </div>
                            <div className="user-info">
                                <label>Email:</label>
                                <div className="data">{user.email}</div>
                            </div>
                            <div className="user-info">
                                <label>Ville:</label>
                                <div className="data">{user.city || user.ville}</div>
                            </div>
                            <div className="user-info">
                                <label>Code postal:</label>
                                <div className="data">{user.postal_code || user.codePostal}</div>
                            </div>
                            {isAdmin && user.email !== currentUserEmail && (
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(user.id)}
                                    aria-label={`Supprimer ${user.firstname || user.nom}`}
                                >
                                    x
                              </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Aucun utilisateur trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default UserList;
