import pool from './db.js';
const result = await pool.query('SELECT count(*) FROM users');
console.log(result.rows[0]);

await pool.end();
