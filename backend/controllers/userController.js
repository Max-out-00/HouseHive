import pool from "../db/pool.js";
import hashPassword from "./encrpt.js";

export const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body

    if (!name || !email || !phone || !password) {
        return res.send("Missing field");
    }
    try {
        const hashedPassword = await hashPassword(password)

        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, phone, role, created_at`,
            [name, email, hashedPassword, phone]
        );
        res.send("Inserted Succesfully")
    } catch (error) {
        console.log(error)
        res.send("Fails to add the records")
    }
}
