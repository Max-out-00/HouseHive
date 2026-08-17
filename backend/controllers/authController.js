import pool from '../db/pool.js';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send("Some feilds are missing ")
    }
    const result = await pool.query(
        `SELECT id, name, email, password_hash, role FROM users WHERE email = $1`,
        [email]
    )
    if (result.rows.length === 0) {
        return res.send("No user with this email exist");
    }

    const user = result.rows[0];        // to use the row actually
    
    const matchPassword = await bycrypt.compare(password, user.password_hash);
    if (!matchPassword) {
        return res.send("Wrong password")
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    return res.json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
};