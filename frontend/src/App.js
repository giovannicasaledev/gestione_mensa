import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardUser from './pages/DashboardUser';
import Navbar from './components/Navbar';


function App() {
  // Stato per forzare il re-render dopo login/logout
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role')
  });

  // Listener per storage event (utile anche se apri 2 tab)
  useEffect(() => {
    const handler = () => {
      setAuth({
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role')
      });
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Funzione da passare ai figli per aggiornare auth
  const updateAuth = () => {
    setAuth({
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role')
    });
  };

  return (
    <Router>
      {auth.token && <Navbar updateAuth={updateAuth} />}
      <Routes>
        <Route
          path="/"
          element={
            auth.token
              ? auth.role === 'admin'
                ? <Navigate to="/admin" />
                : <Navigate to="/user" />
              : <Login updateAuth={updateAuth} />
          }
        />
        <Route path="/register" element={<Register updateAuth={updateAuth} />} />
        <Route
          path="/admin"
          element={
            auth.token && auth.role === 'admin'
              ? <DashboardAdmin />
              : <Navigate to="/" />
          }
        />
        <Route
          path="/user"
          element={
            auth.token && auth.role === 'user'
              ? <DashboardUser />
              : <Navigate to="/" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
