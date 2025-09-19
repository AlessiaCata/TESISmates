import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/productos.routes.js';
import ventasRoutes from './routes/ventas.routes.js';
import reportesRoutes from './routes/reportes.routes.js';
import stockRoutes from './routes/stock.routes.js';

const app = express();
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/auth', authRoutes);
app.use('/productos', productosRoutes);
app.use('/ventas', ventasRoutes);
app.use('/reportes', reportesRoutes);
app.use('/stock', stockRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno' });
});

app.listen(config.port, () => console.log(`API escuchando en :${config.port}`));
