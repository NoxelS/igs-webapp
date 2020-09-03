import logger from '@shared/Logger';
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import MySQLStore from 'express-mysql-session';
import session, { Store } from 'express-session';
import helmet from 'helmet';
import { BAD_REQUEST } from 'http-status-codes';
import morgan from 'morgan';

import BaseRouter from './routes';


// Load env
require('dotenv').config();

// Init express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
    // Security
    app.use(helmet());
} else {
    // Show routes called in console during development
    app.use(morgan('dev'));
}

// MySQL session storage
const sessionStore: Store = new (require('express-mysql-session')(session))({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Use sessions
app.use(session({
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    name: 'igs-keks',
    cookie: {
        maxAge: Number(process.env.SESSION_MAXAGE)
    },
    saveUninitialized: true,
    store: sessionStore
}));

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message
    });
});

// Export express instance
export default app;
