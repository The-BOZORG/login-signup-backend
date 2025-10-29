import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function test() {
  const result = await db.execute({ sql: 'SELECT * FROM users' });
  console.table(result.rows);
}

test();
