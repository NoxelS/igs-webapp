import { connection } from '@configs/database';
import { compare } from 'bcrypt';
import passport from 'passport';

import { User } from '../models/user.model';
import logger from './logger';


// Checkt if user is logged in
export function isLoggedIn() {
    return passport.authenticate('jwt', { session: false });
}

// Used to login
export function verifyUser(username: string, password: string, done: (err: string | null, user?: User | false) => void) {
    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results, fields) => {
        if (error || results.length === 0) {
            done('Wrong username or password.');
        } else {
            logger.info(JSON.stringify(results[0]));
            const hash = results[0].password.toString();
            compare(password, hash, (err, response) => {
                if (response === true) {
                    return done(null, new User(results[0].username, results[0].email, results[0].id, !!results[0].isSuperUser));
                } else {
                    return done(null, false);
                }
            });
        }
    });
}

export function jwtVerifyCallback(payload: any, done: any) {
    connection.query('SELECT * FROM igs.users WHERE (id=?);', payload.sub, (err, results) => {
        if (err) {
            done(err, false);
        } else {
            logger.info('Successful jwt login');
            done(null, new User(results[0].username, results[0].email, results[0].id, !!results[0].isSuperUser));
        }
    });
}
