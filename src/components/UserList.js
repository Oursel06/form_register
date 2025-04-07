import React from 'react';

const UserList = ({ users }) => {
    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.nom} {user.prenom} - {user.email} - {user.dateNaissance} - {user.ville} - {user.codePostal}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;