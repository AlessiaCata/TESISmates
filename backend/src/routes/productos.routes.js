import { Router } from 'express';
import { pool } from '../db.js';
import { authRequired } from '../middleware/auth.js';
import { asyncHandler } from '../utils/errors.js';

const router = Router();

router.get('/', authRequired, asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE activo = 1 ORDER BY creado_en DESC');
  res.json(rows);
}));

router.post('/', authRequired, asyncHandler(async (req, res) => {
  const { nombre, categoria, sku, precio_costo, precio_venta, stock_minimo } = req.body;
  const [result] = await pool.query(
    'INSERT INTO productos (nombre,categoria,sku,precio_costo,precio_venta,stock_minimo) VALUES (?,?,?,?,?,?)',
    [nombre, categoria, sku, precio_costo, precio_venta, stock_minimo || 0]
  );
  res.status(201).json({ id: result.insertId });
}));

router.put('/:id', authRequired, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query('UPDATE productos SET ? WHERE id = ?', [req.body, id]);
  res.json({ updated: result.affectedRows > 0 });
}));

router.get('/alertas/stock-bajo', authRequired, asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE stock_actual <= stock_minimo AND activo = 1');
  res.json(rows);
}));

export default router;
