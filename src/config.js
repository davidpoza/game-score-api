import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envFound = dotenv.config({ path: join(__dirname, '../.env') });

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file");
}

export default {
  port: 3000,
  url: process.env.URL,
  debug: process.env.DEBUG === 'true',
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/',
  },
};

