import { Router } from 'express';
import { pool } from '../db.js';
import { authRequired } from '../middleware/auth.js';
import { asyncHandler } from '../utils/errors.js';

const router = Router();

router.post('/movimiento', authRequired, asyncHandler(async (req, res) => {
  const { producto_id, variante_id, tipo, cantidad, motivo } = req.body;
  if (!cantidad || !tipo) return res.status(400).json({ error: 'tipo y cantidad requeridos' });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    if (variante_id) {
      await conn.query('UPDATE variantes SET stock_actual = stock_actual + ? WHERE id = ?', [tipo === 'entrada' ? cantidad : -cantidad, variante_id]);
      await conn.query('INSERT INTO movimientos_stock(variante_id,tipo,cantidad,motivo,fecha) VALUES (?,?,?,?,NOW())', [variante_id, tipo, cantidad, motivo || null]);
    } else if (producto_id) {
      await conn.query('UPDATE productos SET stock_actual = stock_actual + ? WHERE id = ?', [tipo === 'entrada' ? cantidad : -cantidad, producto_id]);
      await conn.query('INSERT INTO movimientos_stock(producto_id,tipo,cantidad,motivo,fecha) VALUES (?,?,?,?,NOW())', [producto_id, tipo, cantidad, motivo || null]);
    } else {
      return res.status(400).json({ error: 'producto_id o variante_id requeridos' });
    }
    await conn.commit();
    res.status(201).json({ ok: true });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ error: 'No se pudo registrar el movimiento' });
  } finally {
    conn.release();
  }
}));

export default router;
