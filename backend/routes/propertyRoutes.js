import express from 'express'
import { createProperty, getProperties, getPropertyById, uploadPropertyImages} from '../controllers/propertyController.js';
import upload from '../middleware/upload.js';


const router = express.Router();

router.post('/', createProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/:id/images', upload.array('images', 10), uploadPropertyImages);

export default router;