import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventario from './pages/Inventario';
import NuevaVenta from './pages/NuevaVenta';
import { getToken } from './api';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [auth, setAuth] = useState(!!getToken());

  useEffect(() => {
    setAuth(!!getToken());
  }, []);

  if (!auth) return <Login onLogin={() => setAuth(true)} />;

  return (
    <div className="container-fluid p-0">
      <Navbar onNav={setView} />
      <div className="container mt-3">
        {view === 'dashboard' && <Dashboard />}
        {view === 'inventario' && <Inventario />}
        {view === 'venta' && <NuevaVenta />}
      </div>
    </div>
  );
}
