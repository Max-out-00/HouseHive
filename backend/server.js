import express from 'express';
import cors from 'cors';
import userRoutes  from './routes/userRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());

// app.get('/test-db', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     res.json({ success: true, time: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// app.use

app.use('/api/users' , userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));