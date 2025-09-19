import React, { useEffect, useState } from 'react';
import { api } from '../api';
import Loader from '../components/Loader';

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nombre:'', categoria:'', sku:'', precio_costo:'', precio_venta:'', stock_minimo:0 });

  async function load() {
    setLoading(true);
    const data = await api('/productos');
    setProductos(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function crear(e) {
    e.preventDefault();
    await api('/productos', { method: 'POST', body: { ...form, precio_costo:Number(form.precio_costo||0), precio_venta:Number(form.precio_venta||0), stock_minimo:Number(form.stock_minimo||0) } });
    setForm({ nombre:'', categoria:'', sku:'', precio_costo:'', precio_venta:'', stock_minimo:0 });
    load();
  }

  if (loading) return <Loader />;

  return (
    <div className="row g-3">
      <div className="col-md-5">
        <div className="card"><div className="card-body">
          <h6 className="mb-3">Nuevo producto</h6>
          <form onSubmit={crear}>
            <div className="mb-2"><input className="form-control" placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} required /></div>
            <div className="mb-2"><input className="form-control" placeholder="Categoría" value={form.categoria} onChange={e=>setForm({...form, categoria:e.target.value})} /></div>
            <div className="mb-2"><input className="form-control" placeholder="SKU" value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} /></div>
            <div className="mb-2"><input className="form-control" placeholder="Precio costo" value={form.precio_costo} onChange={e=>setForm({...form, precio_costo:e.target.value})} /></div>
            <div className="mb-2"><input className="form-control" placeholder="Precio venta" value={form.precio_venta} onChange={e=>setForm({...form, precio_venta:e.target.value})} /></div>
            <div className="mb-3"><input className="form-control" placeholder="Stock mínimo" value={form.stock_minimo} onChange={e=>setForm({...form, stock_minimo:e.target.value})} /></div>
            <button className="btn btn-primary">Crear</button>
          </form>
        </div></div>
      </div>

      <div className="col-md-7">
        <div className="card"><div className="card-body">
          <h6 className="mb-3">Productos</h6>
          <table className="table table-sm">
            <thead><tr><th>Nombre</th><th>SKU</th><th>Precio</th><th>Stock</th></tr></thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.sku}</td>
                  <td>${Number(p.precio_venta||0).toFixed(2)}</td>
                  <td>{p.stock_actual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
      </div>
    </div>
  );
}
