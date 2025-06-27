import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../styles/Header.css';

export default function Header({ username, onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [fullname, setFullname] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const firstname = decoded.firstname || '';
            const lastname = decoded.lastname || '';
            setFullname(`${firstname} ${lastname}`);
        }
    }, []);

    const params = new URLSearchParams(location.search);
    const view = params.get('view') || 'posts';

    const handleViewChange = (newView) => {
        if (newView !== view) {
            navigate(`/form_register/home?view=${newView}`);
        }
    };

    return (
        <header className="header-container">
            <div className="greeting">
                Bonjour <strong>{fullname}</strong>
            </div>
            <div className={`nav-item ${view === 'users' ? 'active' : ''}`} onClick={() => handleViewChange("users")}>
                Utilisateurs
            </div>
            <div className={`nav-item ${view === 'posts' ? 'active' : ''}`} onClick={() => handleViewChange("posts")}>
                Posts
            </div>
            <button className="logout-button" onClick={onLogout}>
                Déconnexion
            </button>
        </header>
    );
}
