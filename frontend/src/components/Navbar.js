import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ updateAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    if (updateAuth) updateAuth();
    navigate('/'); // Forza redirect a login
  };

  return (
    <nav className="flex justify-end px-8 py-4 bg-violet-700">
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
