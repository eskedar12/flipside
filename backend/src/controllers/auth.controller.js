import bcrypt from 'bcrypt';
import pool from '../db.js';

export async function register(req, res) {
    const {email, password} = req.body;
}