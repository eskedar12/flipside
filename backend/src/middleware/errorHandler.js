export function notFound(req, res) {
  res.status(404).json({ error: 'Route not found' });
}

export function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }

  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
}