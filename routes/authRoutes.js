import express from 'express';
import { signup, login } from '../controller/authcontrollers.js';
const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);

export default authRoutes;
