import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../api/userService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import '../styles/UserList.css';

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
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="user-list">
            {isAdmin ? (
                users.length > 0 ? (
                    <>
                        <h2>Liste des utilisateurs</h2>
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Date de naissance</th>
                                    <th>Email</th>
                                    <th>Ville</th>
                                    <th>Code postal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} className={user.email === currentUserEmail ? "current-user-row" : ""}>
                                        <td>{user.lastname}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.birthdate}</td>
                                        <td>{user.email}</td>
                                        <td>{user.city || user.ville}</td>
                                        <td>{user.postal_code || user.codePostal}</td>
                                        <td>
                                            {user.email !== currentUserEmail && (
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(user.id)}
                                                    aria-label={`Supprimer ${user.firstname}`}
                                                >
                                                    <img
                                                        width={20}
                                                        src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                                                        alt="Supprimer"
                                                        className="trash-icon"
                                                    />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p>Aucun utilisateur trouvé.</p>
                )
            ) : (
                users.length > 0 ? (
                    users
                        .filter(user => user.email === currentUserEmail)
                        .map(user => (
                            <div className="user-card" key={user.id}>
                                <div className="name">
                                    {user.firstname} {user.lastname}
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
                            </div>
                        ))
                ) : (
                    <p>Profil utilisateur introuvable.</p>
                )
            )}
        </div>
    );      
};

export default UserList;
