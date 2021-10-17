import dotenv from 'dotenv';
const envFound = dotenv.config();

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

