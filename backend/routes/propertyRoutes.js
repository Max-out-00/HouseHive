import express from 'express'
import { createProperty, getProperties, getPropertyById, uploadPropertyImages } from '../controllers/propertyController.js';
import upload from '../middleware/upload.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/:id/images', verifyToken, upload.array('images', 10), uploadPropertyImages);

export default router;