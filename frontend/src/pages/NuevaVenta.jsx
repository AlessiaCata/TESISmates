import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function NuevaVenta() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [metodo_pago, setMetodo] = useState('efectivo');

  useEffect(() => {
    api('/productos').then(setProductos);
  }, []);

  function agregar(p) {
    const precio = Number(p.precio_venta || 0);
    const existente = carrito.find(i => i.producto_id === p.id);
    if (existente) {
      setCarrito(carrito.map(i => i.producto_id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i));
    } else {
      setCarrito([...carrito, { producto_id: p.id, cantidad: 1, precio_unitario: precio, nombre: p.nombre }]);
    }
  }

  async function confirmar() {
    if (!carrito.length) return;
    const items = carrito.map(({ producto_id, cantidad, precio_unitario }) => ({ producto_id, cantidad, precio_unitario }));
    const res = await api('/ventas', { method: 'POST', body: { items, metodo_pago } });
    alert('Venta creada: #' + res.id + ' Total $' + res.total.toFixed(2));
    setCarrito([]);
  }

  const total = carrito.reduce((acc, i) => acc + i.cantidad * i.precio_unitario, 0);

  return (
    <div className="row g-3">
      <div className="col-md-7">
        <div className="card"><div className="card-body">
          <h6 className="mb-3">Productos</h6>
          <div className="row row-cols-1 row-cols-md-2 g-2">
            {productos.map(p => (
              <div className="col" key={p.id}>
                <div className="border rounded p-2 d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">{p.nombre}</div>
                    <div className="text-muted" style={{fontSize:12}}>SKU {p.sku} · ${Number(p.precio_venta||0).toFixed(2)}</div>
                  </div>
                  <button className="btn btn-sm btn-outline-primary" onClick={()=>agregar(p)}>Agregar</button>
                </div>
              </div>
            ))}
          </div>
        </div></div>
      </div>

      <div className="col-md-5">
        <div className="card"><div className="card-body">
          <h6 className="mb-3">Carrito</h6>
          {!carrito.length && <div className="text-muted">Sin items</div>}
          {!!carrito.length && (
            <table className="table table-sm">
              <thead><tr><th>Item</th><th>Cant</th><th>Subtotal</th></tr></thead>
              <tbody>
                {carrito.map((i,idx) => (
                  <tr key={idx}>
                    <td>{i.nombre}</td>
                    <td>{i.cantidad}</td>
                    <td>${(i.cantidad * i.precio_unitario).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="d-flex justify-content-between">
            <select className="form-select w-auto" value={metodo_pago} onChange={e=>setMetodo(e.target.value)}>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="mp">MercadoPago</option>
            </select>
            <div className="fw-bold">Total: ${total.toFixed(2)}</div>
          </div>
          <button className="btn btn-success w-100 mt-3" onClick={confirmar} disabled={!carrito.length}>Confirmar venta</button>
        </div></div>
      </div>
    </div>
  );
}
