import dotenv from 'dotenv';
dotenv.config();

if (!process.env.OPEN_AI_API_KEY) {
  throw new Error('Missing Open AI key!');
}

const env = {
  DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV || 'local',
  OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  OPEN_AI_MODEL: process.env.OPEN_AI_MODEL || 'gpt-3.5-turbo',
  REACT_APP_URL: process.env.REACT_APP_URL || 'http://localhost:5173',
};

export default env;
