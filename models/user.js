import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function createUser(username, hashedPassword) {
  return await db.execute({
    sql: 'INSERT INTO users (username, password) VALUES (?, ?)',
    args: [username, hashedPassword],
  });
}

export async function findUserByUsername(username) {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: [username],
  });

  return result.rows.length ? result.rows[0] : null;
}
