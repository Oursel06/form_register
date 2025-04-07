// src/components/Formulaire.js

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { validateNomPrenom, validateEmail, validateDateNaissance, validateCodePostal, validateVille } from '../utils/validations';

const Formulaire = ({ onAddUser }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ajouter l'utilisateur
        const newUser = { nom, prenom, email, dateNaissance, ville, codePostal };
        onAddUser(newUser);

        // Afficher un toaster de succès
        toast.success("Utilisateur enregistré avec succès");

        // Réinitialiser le formulaire
        setNom('');
        setPrenom('');
        setEmail('');
        setDateNaissance('');
        setVille('');
        setCodePostal('');
    };

    const handleBlur = () => {
        // Validation des champs
        setErrors({
            nom: validateNomPrenom(nom),
            prenom: validateNomPrenom(prenom),
            email: validateEmail(email),
            dateNaissance: validateDateNaissance(dateNaissance),
            ville: validateVille(ville),
            codePostal: validateCodePostal(codePostal),
        });
    };

    const isFormValid = !Object.values(errors).includes(false) && nom && prenom && email && dateNaissance && ville && codePostal;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom:</label>
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    onBlur={handleBlur}
                />
                {errors.nom && <span className="error">{errors.nom}</span>}
            </div>

            <div>
                <label>Prénom:</label>
                <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    onBlur={handleBlur}
                />
                {errors.prenom && <span className="error">{errors.prenom}</span>}
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleBlur}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div>
                <label>Date de naissance:</label>
                <input
                    type="date"
                    value={dateNaissance}
                    onChange={(e) => setDateNaissance(e.target.value)}
                    onBlur={handleBlur}
                />
                {errors.dateNaissance && <span className="error">{errors.dateNaissance}</span>}
            </div>

            <div>
                <label>Ville:</label>
                <input
                    type="text"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    onBlur={handleBlur}
                />
                {errors.ville && <span className="error">{errors.ville}</span>}
            </div>

            <div>
                <label>Code postal:</label>
                <input
                    type="text"
                    value={codePostal}
                    onChange={(e) => setCodePostal(e.target.value)}
                    onBlur={handleBlur}
                />
                {errors.codePostal && <span className="error">{errors.codePostal}</span>}
            </div>

            <button type="submit" disabled={!isFormValid}>Valider</button>
        </form>
    );
};

export default Formulaire;
