export default function AlertasStock({ productos }) {
  const bajos = productos.filter(p => p.stock_actual <= p.stock_minimo);
  if (!bajos.length) return null;
  return (
    <div className="alert alert-warning mt-3">
      <strong>Atención:</strong> {bajos.length} producto(s) con stock bajo.
      <ul className="mt-2 mb-0">
        {bajos.map(p => <li key={p.id}>{p.nombre} — {p.stock_actual} u.</li>)}
      </ul>
    </div>
  );
}
