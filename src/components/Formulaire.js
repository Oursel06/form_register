import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { validateNom, validatePrenom, validateEmail, validateDateNaissance, validateCodePostal, validateVille } from '../utils/validations';
import { createUser } from '../api/userService';
import { useNavigate } from 'react-router-dom';
import '../styles/Formulaire.css';

const Formulaire = ({ onAddUser }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            nom: validateNom(nom),
            prenom: validatePrenom(prenom),
            email: validateEmail(email),
            dateNaissance: validateDateNaissance(dateNaissance),
            ville: validateVille(ville),
            codePostal: validateCodePostal(codePostal),
            password: password.length < 6 ? 'Le mot de passe doit faire au moins 6 caractères' : '',
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error !== '')) {
            toast.error("Une erreur est survenue lors de l'inscription, veuillez réessayer.");
            return;
        }

        setIsLoading(true);

        const newUser = { nom, prenom, email, dateNaissance, ville, codePostal, password };

        try {
            const savedUser = await createUser(newUser);
            onAddUser(savedUser);
            toast.success("Utilisateur enregistré !");

            // Réinitialisation du formulaire
            setNom('');
            setPrenom('');
            setEmail('');
            setDateNaissance('');
            setVille('');
            setCodePostal('');
            setPassword('');

            setIsLoading(false)
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
            toast.error("Erreur lors de l'enregistrement.");
            setIsLoading(false);
        }
    };

    const isFormValid = nom && prenom && email && dateNaissance && ville && codePostal && password.length >= 6;

    return (
        <div className="formulaire-container">
            <h2>Inscription</h2>
            <form data-testid="registration-form" onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        data-testid="register-nom"
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
                        data-testid="register-prenom"
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
                        data-testid="register-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ borderColor: errors.email ? 'red' : '' }}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div>
                    <label>Mot de passe:</label>
                    <input
                        data-testid="register-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ borderColor: errors.password ? 'red' : '' }}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div>
                    <label>Date de naissance:</label>
                    <input
                        data-testid="register-dateNaissance"
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
                        data-testid="register-ville"
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
                        data-testid="register-codePostal"
                        type="text"
                        value={codePostal}
                        onChange={(e) => setCodePostal(e.target.value)}
                        style={{ borderColor: errors.codePostal ? 'red' : '' }}
                    />
                    {errors.codePostal && <span className="error">{errors.codePostal}</span>}
                </div>

                <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                    <button type="submit" disabled={!isFormValid || isLoading}>
                        S'inscrire
                        {isLoading && (
                            <span
                                style={{
                                    display: 'inline-block',
                                    marginLeft: 8,
                                    width: 16,
                                    height: 16,
                                    border: '2px solid #fff',
                                    borderTop: '2px solid transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                }}
                            />
                        )}
                    </button>

                    <button type="button" data-testid="switch-to-login" onClick={() => navigate('/form_register/login')}>
                        Connexion
                    </button>
                </div>

                <style>
                    {`
                    @keyframes spin {
                        0% { transform: rotate(0deg);}
                        100% { transform: rotate(360deg);}
                    }
                `}
                </style>
            </form>
        </div>
    );
};

export default Formulaire;
