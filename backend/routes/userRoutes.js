import express from 'express'
import encrpt from '../controllers/encrpt.js'
import {loginUser} from '../controllers/authController.js'

import  { registerUser } from '../controllers/userController.js'

const routes = express.Router();

routes.post('/register',registerUser)       // When someone sends a POST request to /register, execute resisterUser.

routes.post('/login' , loginUser)

router.patch('/:id/status', verifyToken, updateBookingStatus);
export default routes;