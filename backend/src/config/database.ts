import { config } from 'dotenv';
import { createConnection } from 'mysql';


config();

export const connection = createConnection({
    supportBigNumbers: true,
    bigNumberStrings: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})