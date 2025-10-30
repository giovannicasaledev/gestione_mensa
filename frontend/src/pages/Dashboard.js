import React from 'react';

function Dashboard() {
  const role = localStorage.getItem('role');

  return (
    <div>
      <h2>Dashboard</h2>
      {role === 'admin' ? (
        <p>Benvenuto amministratore</p>
      ) : (
        <p>Benvenuto utente, qui potrai vedere i menù</p>
      )}
    </div>
  );
}

export default Dashboard;
