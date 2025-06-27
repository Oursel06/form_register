import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import UserList from "./UserList";
import PostList from "./PostList";

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const view = searchParams.get("view") || "posts";

    const username = "Utilisateur";

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <Header username={username} onLogout={handleLogout} />
            <main style={{ padding: "20px" }}>
                {view === "users" && <UserList />}
                {view === "posts" && <PostList />}
            </main>
        </>
    );
};

export default Home;
