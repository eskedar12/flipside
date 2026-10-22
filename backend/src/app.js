import express from 'express';
import authRoutes from './routes/auth.routes.js';
import decisionsRoutes from './routes/decisions.routes.js';

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/decisions', decisionsRoutes);

export default app;