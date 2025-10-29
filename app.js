import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import config from './config/port.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());
const PORT = config.port;

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server live in http://localhost:${PORT}`);
});
