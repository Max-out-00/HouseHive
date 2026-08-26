import pool from '../db/pool.js'

export const createProperty = async (req, res) => {
    const host_id = req.user.id; // from the verified token, not the request body
    const { title, description, price, location, bedrooms, bathrooms } = req.body;

    if (!host_id || !title || !description || !price || !location || !bedrooms || !bathrooms) {
        return res.status(400).json({ success: false, error: "Some fields are missing" });
    }

    try {

        const result = await pool.query(
            `INSERT INTO properties (host_id, title, description, price, location, bedrooms, bathrooms)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [host_id, title, description, price, location, bedrooms, bathrooms]
        )

        res.status(200).json({
            success: true,
            property: result.rows[0]
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: "Server error"
        })
    }
}

//  GET all properties

export const getProperties = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, COALESCE(
                json_agg(pi.image_url) FILTER (WHERE pi.id IS NOT NULL),
                '[]'::json
            ) AS images
            FROM properties p
            LEFT JOIN property_images pi ON pi.property_id = p.id
            GROUP BY p.id
            ORDER BY p.created_at DESC
        `);
        res.json({ success: true, properties: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};

// get property by ID

export const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT p.*, COALESCE(
                json_agg(pi.image_url) FILTER (WHERE pi.id IS NOT NULL),
                '[]'::json
            ) AS images
            FROM properties p
            LEFT JOIN property_images pi ON pi.property_id = p.id
            WHERE p.id = $1
            GROUP BY p.id
        `, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Property not found" });
        }
        res.json({ success: true, property: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
}
export const uploadPropertyImages = async (req, res) => {
    const { id } = req.params;
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, error: "No files uploaded" });
    }
    try {
        const insertedImages = [];
        for (const file of req.files) {
            const imageUrl = file.path;

            const result = await pool.query(
                `INSERT INTO property_images (property_id, image_url)
                 VALUES ($1, $2)
                 RETURNING *`,
                [id, imageUrl]
            );
            insertedImages.push(result.rows[0]);
        }

        res.status(201).json({ success: true, images: insertedImages });
    } catch (error) {
        console.error('Upload error:', error.message);
        res.status(500).json({ success: false, error: "Server error" });
    }
};