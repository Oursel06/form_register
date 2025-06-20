import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../api/userService";

const LoginForm = ({ onBack, onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorVisible(false);
        try {
            const response = await login(email, password);
            const token = response.access_token;
            localStorage.setItem("token", token);
            toast.success("Connexion réussie");
            onLoginSuccess(token);
        } catch (error) {
            setErrorVisible(true);
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

                {errorVisible && (
                    <div data-testid="login-error" style={{ color: 'red', marginTop: 8 }}>
                        Email ou mot de passe incorrect
                    </div>
                )}

                <div className="button-group" style={{ marginTop: 15 }}>
                    <button type="submit" disabled={isLoading}>
                        Se connecter
                        {isLoading && <MiniLoader />}
                    </button>
                    <button type="button" onClick={onBack} style={{ marginLeft: 10 }}>
                        Retour
                    </button>
                </div>
            </form>
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
                `}
            </style>
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