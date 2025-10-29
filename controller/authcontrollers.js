import * as authService from '../services/authservice.js';
import * as userModel from '../models/user.js';

export async function signup(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'username and password needed' });

    const existing = await userModel.findUserByUsername(username);
    if (existing)
      return res.status(409).json({ message: 'username is duplicate' });

    const hashed = await authService.hashPassword(password);
    await userModel.createUser(username, hashed);

    return res.status(201).json({ message: 'user is creeted sucessfuly' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'username and password needed' });

    const user = await userModel.findUserByUsername(username);
    if (!user)
      return res.status(401).json({ message: 'username or password is wrong' });

    const ok = await authService.comparePassword(password, user.password);
    if (!ok)
      return res.status(401).json({ message: 'username or password is wrong' });

    const token = authService.generateJwt({
      id: user.id,
      username: user.username,
    });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
}
