import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ updateAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        { email, password }
      );
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('userEmail', res.data.email);
      if (updateAuth) updateAuth(); // forza il re-render in App.js
      // Redirect dinamico
      navigate(res.data.role === 'admin' ? '/admin' : '/user');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-violet-200">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Login</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Non hai un account?{' '}
          <Link to="/register" className="text-blue-700 underline font-semibold">
            Registrati
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
