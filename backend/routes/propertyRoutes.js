import express from 'express'
import { createProperty, getProperties, getPropertyById } from '../controllers/propertyController.js';

const router = express.Router();

router.post('/', createProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);

export default router;