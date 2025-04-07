import React from 'react';

const UserList = ({ users }) => {
    return (
        <div className='user-list'>
            <h2>Liste des utilisateurs</h2>
            <div className="user-cards-container">
                {users.map((user, index) => (
                    <div className="user-card" key={index}>
                        <div className="name">
                            {user.nom} {user.prenom}
                        </div>
                        <div className="user-info">
                            <label>Date de naissance:</label>
                            <div className="data">{user.dateNaissance}</div>
                        </div>
                        <div className="user-info">
                            <label>Email:</label>
                            <div className="data">{user.email}</div>
                        </div>
                        <div className="user-info">
                            <label>Ville:</label>
                            <div className="data">{user.ville}</div>
                        </div>
                        <div className="user-info">
                            <label>Code postal:</label>
                            <div className="data">{user.codePostal}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;