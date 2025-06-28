import { toast } from 'react-toastify';
import '../styles/MenuPost.css';

const MenuPost = () => {
    const handleFavorisClick = () => {
        toast.info("En cours de développement !");
    };

    return (
        <div className="menu-post">
            <h3>Menu</h3>
            <ul>
                <li>Tous</li>
                <li>Mes postes</li>
                <li
                    onClick={handleFavorisClick}
                    style={{ cursor: 'pointer' }}
                >
                    Favoris
                </li>
            </ul>
        </div>
    );
};

export default MenuPost;
