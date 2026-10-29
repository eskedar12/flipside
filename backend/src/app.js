import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import decisionsRoutes from './routes/decisions.routes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.set('trust proxy', 1);
}

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/decisions', decisionsRoutes);

app.use('/api', notFound);

if (isProduction) {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const distPath = path.join(currentDir, '../../frontend/dist');

  app.use(express.static(distPath));

  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;