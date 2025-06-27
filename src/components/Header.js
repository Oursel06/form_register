import { useNavigate } from 'react-router-dom';

export default function Header({ username, onLogout }) {
    const navigate = useNavigate();

    const handleViewChange = (view) => {
        navigate(`/form_register/home?view=${view}`);
    };

    return (
        <header>
            <div>
                <strong>Bienvenue {username}</strong>
                <button onClick={onLogout}>Déconnexion</button>
            </div>
            <nav>
                <button onClick={() => handleViewChange("users")}>Utilisateurs</button>
                <button onClick={() => handleViewChange("posts")}>Posts</button>
            </nav>
        </header>
    );
}
