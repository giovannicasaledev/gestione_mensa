import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ updateAuth }) => {
  const [form, setForm] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
    password2: '',
    celiaco: false,
    vegano: false,
    allergeni: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.password2) {
      setError('Le password non coincidono');
      return;
    }
    try {
      // 1. Registrazione
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        {
          nome: form.nome,
          cognome: form.cognome,
          email: form.email,
          password: form.password,
          celiaco: form.celiaco,
          vegano: form.vegano,
          allergeni: form.allergeni
        }
      );
      // 2. Login automatico (usa email)
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          email: form.email,
          password: form.password
        }
      );
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      if (updateAuth) updateAuth(); // forza il re-render in App.js
      // 3. Redirect dinamico in base al ruolo
      navigate(res.data.role === 'admin' ? '/admin' : '/user');
    } catch (err) {
      setError(
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : 'Errore nella registrazione'
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-violet-900">Register</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-violet-300"
            placeholder="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-violet-300"
            placeholder="Cognome"
            name="cognome"
            value={form.cognome}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-violet-300"
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-violet-300"
            placeholder="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-violet-300"
            placeholder="Ripeti password"
            name="password2"
            type="password"
            value={form.password2}
            onChange={handleChange}
            required
          />
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="celiaco"
                checked={form.celiaco}
                onChange={handleChange}
                className="mr-2"
              />
              Celiaco
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="vegano"
                checked={form.vegano}
                onChange={handleChange}
                className="mr-2"
              />
              Vegano
            </label>
          </div>
          <textarea
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-violet-300"
            name="allergeni"
            placeholder="Lista allergeni (opzionale)"
            value={form.allergeni}
            onChange={handleChange}
            rows={2}
          />
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 rounded transition"
          >
            Registrati
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
