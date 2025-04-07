import React, { useState } from 'react';
import './App.css';
import Formulaire from './components/Formulaire';
import UserList from './components/UserList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <h1>Inscription utilisateur</h1>
      <Formulaire onAddUser={addUser} />
      <UserList users={users} />
      <ToastContainer closeButton={false} />
    </div>
  );
}

export default App;
