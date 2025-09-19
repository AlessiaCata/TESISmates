import { pool } from '../db.js';

export async function crearVenta({ items, metodo_pago = 'efectivo', cliente_id = null, usuario_id }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let total = 0;
    for (const it of items) total += it.cantidad * it.precio_unitario;

    const [venta] = await conn.query(
      'INSERT INTO ventas(fecha,total,metodo_pago,cliente_id,usuario_id) VALUES (NOW(),?,?,?,?)',
      [total, metodo_pago, cliente_id, usuario_id]
    );

    for (const it of items) {
      await conn.query(
        'INSERT INTO venta_items(venta_id,producto_id,variante_id,cantidad,precio_unitario,subtotal) VALUES (?,?,?,?,?,?)',
        [venta.insertId, it.producto_id || null, it.variante_id || null, it.cantidad, it.precio_unitario, it.cantidad * it.precio_unitario]
      );

      if (it.variante_id) {
        await conn.query('UPDATE variantes SET stock_actual = stock_actual - ? WHERE id = ?', [it.cantidad, it.variante_id]);
        await conn.query('INSERT INTO movimientos_stock(variante_id,tipo,cantidad,motivo,referencia_id,fecha) VALUES (?,?,?,?,?,NOW())', [it.variante_id, 'salida', it.cantidad, 'venta', venta.insertId]);
      } else if (it.producto_id) {
        await conn.query('UPDATE productos SET stock_actual = stock_actual - ? WHERE id = ?', [it.cantidad, it.producto_id]);
        await conn.query('INSERT INTO movimientos_stock(producto_id,tipo,cantidad,motivo,referencia_id,fecha) VALUES (?,?,?,?,?,NOW())', [it.producto_id, 'salida', it.cantidad, 'venta', venta.insertId]);
      }
    }

    await conn.commit();
    return { id: venta.insertId, total };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}
