import React, { useState } from 'react';
import { api, setToken } from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@mates.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await api('/auth/login', { method: 'POST', body: { email, password } });
      setToken(res.token);
      onLogin();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h3 className="mt-5 mb-3">Ingresar</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
      <p className="text-muted mt-3" style={{fontSize:12}}>Usa los datos por defecto o modificalos tras importar el seed.sql</p>
    </div>
  );
}
