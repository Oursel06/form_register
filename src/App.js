import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Login';
import Formulaire from './components/Formulaire';
import Home from './components/Home';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPost from './components/AddPost';

function App() {
  const [username, setUsername] = useState(null);

  const handleLogin = (name) => {
    setUsername(name);
  };

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('token');
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/form_register/login" replace />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/form_register/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/form_register/home" element={<Home />} />
        <Route path="/form_register/register" element={<Formulaire />} />
        <Route
          path="/form_register/home"
          element={
            username ? (
              <Home username={username} onLogout={handleLogout} />
            ) : (
              <Navigate to="/form_register/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/form_register/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
