import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { asyncHandler } from '../utils/errors.js';
import { crearVenta } from '../services/ventas.service.js';

const router = Router();

router.post('/', authRequired, asyncHandler(async (req, res) => {
  const usuario_id = req.user.id;
  const venta = await crearVenta({ ...req.body, usuario_id });
  res.status(201).json(venta);
}));

export default router;
