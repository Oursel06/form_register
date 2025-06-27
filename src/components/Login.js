import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../api/userService";
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await login(email, password);
            const token = response.access_token;
            localStorage.setItem("token", token);
            navigate("/form_register/home");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Email ou mot de passe incorrect");
        }
        setIsLoading(false);
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            <form data-testid="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        data-testid="login-email"
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        data-testid="login-password"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="button-group" style={{ marginTop: 15 }}>
                    <button type="submit" disabled={isLoading}>
                        Se connecter
                        {isLoading && <MiniLoader />}
                    </button>
                    <p style={{ marginTop: 12, fontSize: '0.9rem' }}>
                        Pas de compte ?{' '}
                        <span
                            className="signup-link"
                            onClick={() => navigate('/form_register/register')}
                            role="link"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/form_register/register'); }}
                        >
                            M'inscrire
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

const MiniLoader = () => (
    <span
        style={{
            display: "inline-block",
            marginLeft: 8,
            width: 16,
            height: 16,
            border: "2px solid #000",
            borderTop: "2px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
        }}
    />
);

export default LoginForm;