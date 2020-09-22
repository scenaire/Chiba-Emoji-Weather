import dotenv from 'dotenv';

const result = dotenv.config();
const envs = result.parsed;

module.exports = envs;