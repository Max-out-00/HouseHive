import pool from "../db/pool.js";
import hashPassword from "./encrpt";

export const resisterUser = async (req , res)=>{
    const {name , email , phone , Password} = req.body

    if (!name || !email || !phone || !Password) {
        return re.send("Missing field");
    }
    try {
        const hashedPassword = await hashPassword(Password)

        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, name, email, role, created_at`,
            [name, email, hashedPassword]
        )
        res.send("Inserted Succesfully")
    } catch (error) {
        console.log(error)
        res.send("Fails to add the records")
    }
}
