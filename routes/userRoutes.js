import express from 'express';
import { authMiddleware } from '../middlewares/authmiddleware.js';

const userRouter = express.Router();

userRouter.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'user profile', user: req.user });
});

export default userRouter;
