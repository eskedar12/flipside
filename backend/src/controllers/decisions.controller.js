import pool from '../db.js';

export async function createDecision(req, res) {
  const { optionA, optionB, result } = req.body;

  if (!optionA || !optionB || !result) {
    return res.status(400).json({ error: 'Both options and the result are required' });
  }

  if (optionA.length > 200 || optionB.length > 200) {
    return res.status(400).json({ error: 'Options must be 200 characters or less' });
  }

  if (result !== optionA && result !== optionB) {
    return res.status(400).json({ error: 'Result must be one of the two options' });
  }

  try {
    const saved = await pool.query(
      'INSERT INTO decisions (user_id, option_a, option_b, result) VALUES ($1, $2, $3, $4) RETURNING id, option_a, option_b, result, created_at',
      [req.userId, optionA, optionB, result]
    );
    res.status(201).json({ decision: saved.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

export async function getDecisions(req, res) {
  try {
    const found = await pool.query(
      'SELECT id, option_a, option_b, result, created_at FROM decisions WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    res.json({ decisions: found.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

export async function deleteDecision(req, res) {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: 'Invalid decision id' });
  }

  try {
    const deleted = await pool.query(
      'DELETE FROM decisions WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.userId]
    );

    if (deleted.rowCount === 0) {
      return res.status(404).json({ error: 'Decision not found' });
    }

    res.json({ deleted: deleted.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}