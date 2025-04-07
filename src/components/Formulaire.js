import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { validateNom, validatePrenom, validateEmail, validateDateNaissance, validateCodePostal, validateVille } from '../utils/validations';

const Formulaire = ({ onAddUser }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const newErrors = {
            nom: validateNom(nom),
            prenom: validatePrenom(prenom),
            email: validateEmail(email),
            dateNaissance: validateDateNaissance(dateNaissance),
            ville: validateVille(ville),
            codePostal: validateCodePostal(codePostal),
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error !== '')) {
            toast.error("Une erreur est survenue lors de l'inscription, veuillez réessayer.");
            return;
        } else {
            const newUser = { nom, prenom, email, dateNaissance, ville, codePostal };
            onAddUser(newUser);

            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            window.location.reload();

            toast.success("Utilisateur enregistré !");

            setNom('');
            setPrenom('');
            setEmail('');
            setDateNaissance('');
            setVille('');
            setCodePostal('');
        }
    };

    const isFormValid = nom && prenom && email && dateNaissance && ville && codePostal;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom:</label>
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    style={{ borderColor: errors.nom ? 'red' : '' }}
                />
                {errors.nom && <span className="error">{errors.nom}</span>}
            </div>

            <div>
                <label>Prénom:</label>
                <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    style={{ borderColor: errors.prenom ? 'red' : '' }}
                />
                {errors.prenom && <span className="error">{errors.prenom}</span>}
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderColor: errors.email ? 'red' : '' }}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div>
                <label>Date de naissance:</label>
                <input
                    type="date"
                    value={dateNaissance}
                    onChange={(e) => setDateNaissance(e.target.value)}
                    style={{ borderColor: errors.dateNaissance ? 'red' : '' }}
                />
                {errors.dateNaissance && <span className="error">{errors.dateNaissance}</span>}
            </div>

            <div>
                <label>Ville:</label>
                <input
                    type="text"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    style={{ borderColor: errors.ville ? 'red' : '' }}
                />
                {errors.ville && <span className="error">{errors.ville}</span>}
            </div>

            <div>
                <label>Code postal:</label>
                <input
                    type="text"
                    value={codePostal}
                    onChange={(e) => setCodePostal(e.target.value)}
                    style={{ borderColor: errors.codePostal ? 'red' : '' }}
                />
                {errors.codePostal && <span className="error">{errors.codePostal}</span>}
            </div>

            <button type="submit" disabled={!isFormValid}>Valider</button>
        </form>
    );
};

export default Formulaire;
