import { verifyJwt } from '../services/authservice.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'token is not exist' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyJwt(token);
  if (!decoded) {
    return res.status(401).json({ message: 'token is not valid ' });
  }

  req.user = decoded;
  next();
}
