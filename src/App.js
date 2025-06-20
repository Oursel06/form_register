import React, { useEffect, useState } from 'react';
import './App.css';
import Formulaire from './components/Formulaire';
import UserList from './components/UserList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllUsers } from './api/userService';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Une erreur est survenue lors de la récupération des utilisateurs, veuillez réessayer.");
    }
  };

  const addUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    window.location.reload();
  };

  return (
    <div className="App">
      {currentUser ? (
        <>
          <div className="navbar">
            <div className="navbar-left">
              Bonjour <span className="username">{currentUser.email}</span>
            </div>
            <div className="navbar-right">
              <button onClick={handleLogout} className="logout-button">
                Se déconnecter
              </button>
            </div>
          </div>

          <UserList users={users} isAdmin={currentUser.is_admin} onUserDeleted={fetchUsers} />
        </>      
      ) : (
        <>
          <Formulaire onAddUser={addUser} />
        </>
      )}

      <ToastContainer closeButton={false} />
    </div>
  );
}

export default App;
