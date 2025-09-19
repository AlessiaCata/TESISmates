import { Router } from 'express';
import { pool } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { asyncHandler } from '../utils/errors.js';

const router = Router();

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  const user = rows[0];
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });
  const token = jwt.sign({ id: user.id, rol: user.rol, email: user.email }, config.jwtSecret, { expiresIn: '8h' });
  res.json({ token, usuario: { id: user.id, nombre: user.nombre, rol: user.rol } });
}));

export default router;
