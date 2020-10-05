import { connection } from '@configs/database';
import logger from '@shared/logger';
import { setLocals } from '@shared/utils';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import 'express-async-errors';
import fileUpload from 'express-fileupload';
import session, { Store } from 'express-session';
import { readFileSync } from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import passport, { initialize } from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import { ErrorResponse } from './models/response.model';
import { User } from './models/user.model';
import ApiRouter from './routes';


// Load env
config();

// Set CORS options
const corsOptions: cors.CorsOptions = process.env.NODE_ENV === 'production' ? { origin: process.env.CORS_ORIGIN } : { origin: '*' };

// Init express
const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
if (process.env.NODE_ENV === 'production') {
    // Security
    app.use(helmet());
} else {
    // Show routes called in console during development
    app.use(morgan('dev'));
}

// Create MySQL session storage
const sessionStore: Store = new (require('express-mysql-session')(session))({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Use sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET || '',
        resave: false,
        name: 'igs-keks',
        cookie: {
            maxAge: Number(process.env.SESSION_MAXAGE)
        },
        saveUninitialized: true,
        store: sessionStore
    })
);

// Authentication
app.use(passport.initialize());
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: readFileSync(__dirname + '/keys/id_rsa_pub.pem'),
    algorithmes: ['RS256']
};
passport.use(
    new JWTStrategy(jwtOptions, (payload, done) => {
        connection.query('SELECT * FROM igs.users WHERE (id=?);', payload.sub, (err, results) => {
            if (err) {
                done(err, false);
            } else {
                logger.info('Successful jwt login');
                done(null, new User(results[0].username, results[0].email, results[0].id));
            }
        });
    })
);

app.use(setLocals);

// Add APIs
app.use('/api', ApiRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.json(new ErrorResponse(err.message));
});

// Export express instance
export default app;
