import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialForm = {
  date: '',
  primo: '',
  secondo: '',
  contorno: '',
  frutta: '',
  dolce: '',
  bevande: '',
};

const DashboardAdmin = () => {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  // Carica i menu esistenti
  const fetchMenus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/menus`);
      setMenus(res.data);
    } catch (err) {
      setMessage('Errore nel caricamento dei menù.');
    }
  };

  // Carica utenti
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      // Gestisci errore
    }
  };

  useEffect(() => {
    fetchMenus();
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  // Gestione input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Aggiungi o aggiorna menu
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.date ||
      !form.primo ||
      !form.secondo ||
      !form.contorno ||
      !form.frutta ||
      !form.dolce ||
      !form.bevande
    ) {
      setMessage('Compila tutti i campi.');
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/menus/${editingId}`, form);
        setMessage('Menu aggiornato!');
      } else {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/menus`, form);
        setMessage('Menu aggiunto!');
      }
      setForm(initialForm);
      setEditingId(null);
      fetchMenus();
    } catch (err) {
      setMessage('Errore nel salvataggio.');
    }
  };

  // Avvia modifica
  const handleEdit = (menu) => {
    setForm({
      date: menu.date.slice(0, 10),
      primo: menu.primo,
      secondo: menu.secondo,
      contorno: menu.contorno,
      frutta: menu.frutta,
      dolce: menu.dolce,
      bevande: menu.bevande,
    });
    setEditingId(menu._id);
  };

  // Cancella menu
  const handleDelete = async (id) => {
    if (window.confirm('Sicuro di voler eliminare questo menu?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/menus/${id}`);
        setMessage('Menu eliminato!');
        fetchMenus();
      } catch {
        setMessage('Errore durante eliminazione.');
      }
    }
  };

  // Annulla modifica
  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage('');
  };

  // Cancella utente
  const handleDeleteUser = async (id) => {
    if (window.confirm('Sicuro di voler eliminare questo utente?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`);
        setUsers(prev => prev.filter(u => u._id !== id));
      } catch {
        alert('Errore durante eliminazione utente.');
      }
    }
  };

const DashboardAdmin = () => {
  // ...tutti gli useState...

  // ...altre funzioni come fetchMenus, fetchUsers, handleDeleteUser, ecc...

  // === QUI la funzione per il cambio ruolo! ===
const handleChangeRole = async (userId, newRole) => {
  try {
    await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}/role`, { role: newRole });
    setUsers(prevUsers =>
      prevUsers.map(u => (u._id === userId ? { ...u, role: newRole } : u))
    );
  } catch (err) {
    alert('Errore durante il cambio ruolo.');
  }
};

  // ...resto del componente e return JSX...
};

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-100 to-violet-200 py-8">
      <div className="max-w-[1800px] mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-4 text-center">
          Benvenuto nella Dashboard Admin
        </h1>
        <p className="text-center text-lg mb-8 text-indigo-700">
          Gestisci il menù della mensa aziendale e scolastica.
        </p>
        
        {/* Form menù */}
        <form onSubmit={handleSubmit} className="bg-indigo-50 rounded-xl p-6 mb-8 shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">
            {editingId ? 'Modifica Menu' : 'Aggiungi Pasto del Giorno'}
          </h2>
          {message && <div className="mb-3 text-center text-indigo-700">{message}</div>}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-4">
            <input
              type="date"
              name="date"
              className="p-3 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full min-w-[170px] max-w-[200px]"
              value={form.date}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="primo"
              className="p-3 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full min-w-[140px]"
              placeholder="Primo"
              value={form.primo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="secondo"
              className="p-3 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full min-w-[140px]"
              placeholder="Secondo"
              value={form.secondo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contorno"
              className="p-3 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full min-w-[140px]"
              placeholder="Contorno"
              value={form.contorno}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="frutta"
              className="p-3 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full min-w-[120px]"
              placeholder="Frutta"
              value={form.frutta}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="dolce"
              className="p-3 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full min-w-[120px]"
              placeholder="Dolce"
              value={form.dolce}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="bevande"
              className="p-3 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full min-w-[120px]"
              placeholder="Bevande"
              value={form.bevande}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 min-w-[120px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded transition text-center"
              style={{ maxWidth: 160 }}
            >
              {editingId ? 'Salva Modifiche' : 'Aggiungi'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 min-w-[120px] bg-gray-200 hover:bg-gray-300 text-indigo-900 font-bold py-2 rounded transition text-center"
                style={{ maxWidth: 160 }}
              >
                Annulla
              </button>
            )}
          </div>
        </form>
        
        {/* Menù settimanale */}
        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-bold mb-4 text-indigo-800">Menù Settimanale</h2>
          {menus.length === 0 ? (
            <div className="text-center text-gray-500">Nessun menù inserito.</div>
          ) : (
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="pb-3 text-indigo-700 w-32">Data</th>
                  <th className="pb-3 text-indigo-700 w-40">Primo</th>
                  <th className="pb-3 text-indigo-700 w-40">Secondo</th>
                  <th className="pb-3 text-indigo-700 w-40">Contorno</th>
                  <th className="pb-3 text-indigo-700 w-32">Frutta</th>
                  <th className="pb-3 text-indigo-700 w-32">Dolce</th>
                  <th className="pb-3 text-indigo-700 w-32">Bevande</th>
                  <th className="pb-3 w-48"></th>
                </tr>
              </thead>
              <tbody>
                {menus.map(menu => (
                  <tr key={menu._id} className="border-b last:border-0">
                    <td className="py-3 px-2">
                      <div className="bg-indigo-50 rounded-xl shadow-sm border px-6 py-2 font-semibold text-indigo-900 min-w-[120px]">
                        {new Date(menu.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="bg-blue-50 rounded-xl shadow-sm border px-6 py-2 min-w-[140px]">{menu.primo}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="bg-blue-50 rounded-xl shadow-sm border px-6 py-2 min-w-[140px]">{menu.secondo}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="bg-blue-50 rounded-xl shadow-sm border px-6 py-2 min-w-[140px]">{menu.contorno}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="bg-blue-50 rounded-xl shadow-sm border px-6 py-2 min-w-[120px]">{menu.frutta}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="bg-blue-50 rounded-xl shadow-sm border px-6 py-2 min-w-[120px]">{menu.dolce}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="bg-blue-50 rounded-xl shadow-sm border px-6 py-2 min-w-[120px]">{menu.bevande}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8 justify-center">
                        <button
                          onClick={() => handleEdit(menu)}
                          className="w-24 h-10 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded transition flex items-center justify-center"
                        >
                          Modifica
                        </button>
                        <button
                          onClick={() => handleDelete(menu._id)}
                          className="w-24 h-10 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition flex items-center justify-center"
                        >
                          Elimina
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

{/* Lista utenti registrati */}
<div className="bg-white mt-10 p-6 rounded-xl shadow-md">
  <h2 className="text-xl font-bold mb-4 text-indigo-800">Utenti Registrati</h2>
  {users.length === 0 ? (
    <div className="text-center text-gray-500">Nessun utente registrato.</div>
  ) : (
    <table className="w-full text-center table-fixed">
      <thead>
        <tr>
          <th className="pb-3 text-indigo-700 w-36">Nome</th>
          <th className="pb-3 text-indigo-700 w-36">Cognome</th>
          <th className="pb-3 text-indigo-700 w-56">Email</th>
          <th className="pb-3 text-indigo-700 w-36">Celiaco</th>
          <th className="pb-3 text-indigo-700 w-36">Vegano</th>
          <th className="pb-3 text-indigo-700 w-60">Allergeni</th>
          <th className="pb-3 text-indigo-700 w-32">Ruolo</th>
          <th className="pb-3 w-32"></th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id} className="border-b last:border-0">
            <td className="py-3 px-2"><div className="bg-blue-50 rounded-xl shadow-sm border px-4 py-2">{user.nome}</div></td>
            <td className="py-3 px-2"><div className="bg-blue-50 rounded-xl shadow-sm border px-4 py-2">{user.cognome}</div></td>
            <td className="py-3 px-2"><div className="bg-blue-50 rounded-xl shadow-sm border px-4 py-2">{user.email}</div></td>
            <td className="py-3 px-2"><div className="bg-blue-50 rounded-xl shadow-sm border px-4 py-2">{user.celiaco ? 'Sì' : 'No'}</div></td>
            <td className="py-3 px-2"><div className="bg-blue-50 rounded-xl shadow-sm border px-4 py-2">{user.vegano ? 'Sì' : 'No'}</div></td>
            <td className="py-3 px-2"><div className="bg-blue-50 rounded-xl shadow-sm border px-4 py-2">{user.allergeni || '-'}</div></td>
            {/* Ruolo: solo select se non è l’admin corrente */}
            <td className="py-3 px-2">
              <div className="bg-green-50 rounded-xl shadow-sm border px-4 py-2 font-bold uppercase text-green-700 flex items-center justify-center">
                {user.email === localStorage.getItem('userEmail') ? (
                  // L’admin corrente non può cambiare il proprio ruolo
                  <span>{user.ruolo || user.role}</span>
                ) : (
                  <select
                    value={user.ruolo || user.role}
                    className="bg-green-50 border-none font-bold uppercase text-green-700 focus:ring-2 rounded-xl px-2 py-1"
                    onChange={e => handleChangeRole(user._id, e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                )}
              </div>
            </td>
            <td className="py-3 px-2">
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="w-20 h-10 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition flex items-center justify-center mx-auto"
                disabled={user.email === localStorage.getItem('userEmail')}
                title={user.email === localStorage.getItem('userEmail') ? "Non puoi eliminare te stesso!" : ""}
              >
                Elimina
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

      </div>
    </div>
  );
};

export default DashboardAdmin;
