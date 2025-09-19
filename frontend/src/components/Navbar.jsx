import React from 'react';
export default function Navbar({ onNav }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={() => onNav('dashboard')}>Mates ERP</a>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="#" onClick={() => onNav('inventario')}>Inventario</a></li>
            <li className="nav-item"><a className="nav-link" href="#" onClick={() => onNav('venta')}>Nueva Venta</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
