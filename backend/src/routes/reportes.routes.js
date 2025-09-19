import { Router } from 'express';
import { pool } from '../db.js';
import { authRequired } from '../middleware/auth.js';
import { asyncHandler } from '../utils/errors.js';

const router = Router();

router.get('/ventas', authRequired, asyncHandler(async (req, res) => {
  const { desde, hasta } = req.query;
  const [rows] = await pool.query(
    `SELECT DATE(fecha) dia, SUM(total) total
     FROM ventas
     WHERE fecha BETWEEN ? AND ?
     GROUP BY DATE(fecha)
     ORDER BY dia ASC`,
    [desde || '2000-01-01', hasta || '2999-12-31']
  );
  res.json(rows);
}));

router.get('/top-productos', authRequired, asyncHandler(async (req, res) => {
  const limite = Number(req.query.limite || 5);
  const [rows] = await pool.query(
    `SELECT COALESCE(p.nombre, CONCAT('Variante ', vi.variante_id)) nombre, SUM(vi.cantidad) cantidad
     FROM venta_items vi
     LEFT JOIN productos p ON p.id = vi.producto_id
     GROUP BY nombre
     ORDER BY cantidad DESC
     LIMIT ?`,
    [limite]
  );
  res.json(rows);
}));

export default router;
