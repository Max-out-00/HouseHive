import pool from '../db/pool.js'

export const createBooking = async (req, res) => {
    const renter_id = req.user.id; // from the verified token
    const { property_id, start_date, end_date } = req.body;

    if (!property_id || !start_date || !end_date) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
    }
    
    try {
        const overlapCheck = await pool.query(
            `SELECT id FROM bookings
             WHERE property_id = $1
             AND status != 'cancelled'
             AND (start_date, end_date) OVERLAPS ($2::date, $3::date)`,
            [property_id, start_date, end_date]
        );

        if (overlapCheck.rows.length > 0) {
            return res.status(409).json({ success: false, error: "Property already booked for these dates" });
        }

        const result = await pool.query(
            `INSERT INTO bookings (property_id, renter_id, start_date, end_date)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [property_id, renter_id, start_date, end_date]
        );

        res.status(201).json({ success: true, booking: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};

export const getBookingsByRenter = async (req, res) => {
    const { renterId } = req.params;

    try {
        const result = await pool.query(
            `SELECT b.*, p.title, p.location
             FROM bookings b
             JOIN properties p ON b.property_id = p.id
             WHERE b.renter_id = $1
             ORDER BY b.start_date DESC`,
            [renterId]
        );

        res.json({ success: true, bookings: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};

export const getBookingsByProperty = async (req, res) => {
    const { propertyId } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM bookings WHERE property_id = $1 ORDER BY start_date`,
            [propertyId]
        );

        res.json({ success: true, bookings: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};

export const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'confirmed' or 'cancelled'
    const hostId = req.user.id;

    if (!['confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({ success: false, error: "Invalid status" });
    }

    try {
        // Confirm this booking's property actually belongs to the requesting host
        const check = await pool.query(
            `SELECT b.id FROM bookings b
             JOIN properties p ON b.property_id = p.id
             WHERE b.id = $1 AND p.host_id = $2`,
            [id, hostId]
        );

        if (check.rows.length === 0) {
            return res.status(403).json({ success: false, error: "Not authorized to update this booking" });
        }

        const result = await pool.query(
            `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
            [status, id]
        );

        res.json({ success: true, booking: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};

export const getBookingsForHost = async (req, res) => {
    const hostId = req.user.id;

    try {
        const result = await pool.query(
            `SELECT b.*, p.title, p.location
             FROM bookings b
             JOIN properties p ON b.property_id = p.id
             WHERE p.host_id = $1
             ORDER BY b.created_at DESC`,
            [hostId]
        );

        res.json({ success: true, bookings: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};