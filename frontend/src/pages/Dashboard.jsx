import React, { useEffect, useState } from 'react';
import { api } from '../api';
import Loader from '../components/Loader';
import AlertasStock from '../components/AlertasStock';

export default function Dashboard() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [v, p] = await Promise.all([
          api('/reportes/ventas?desde=2000-01-01&hasta=2999-12-31'),
          api('/productos')
        ]);
        setVentas(v);
        setProductos(p);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  const total = ventas.reduce((acc, d) => acc + Number(d.total || 0), 0);

  return (
    <div>
      <h4 className="mb-3">Dashboard</h4>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card"><div className="card-body">
            <h6>Total vendido (histórico)</h6>
            <div className="fs-4">${total.toFixed(2)}</div>
          </div></div>
        </div>
        <div className="col-md-4">
          <div className="card"><div className="card-body">
            <h6>Productos activos</h6>
            <div className="fs-4">{productos.length}</div>
          </div></div>
        </div>
      </div>

      <AlertasStock productos={productos} />

      <div className="card mt-3">
        <div className="card-body">
          <h6 className="mb-3">Ventas por día</h6>
          <table className="table table-sm">
            <thead><tr><th>Día</th><th>Total</th></tr></thead>
            <tbody>
              {ventas.map((r, i) => <tr key={i}><td>{new Date(r.dia).toLocaleDateString()}</td><td>${Number(r.total).toFixed(2)}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
