import { connection } from '@configs/database';
import { compare } from 'bcrypt';
import passport from 'passport';

import { User } from '../models/user.model';
import logger, { logToConsole } from './logger';


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
            const hash = results[0].password.toString();
            compare(password, hash, (err, response) => {
                if (response === true) {
                    return done(null, User.fromDbEntry(results[0]));
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
            logToConsole('Successful jwt login ' + results[0].isSuperUser + " " + results[0].email);
            done(null, User.fromDbEntry(results[0]));
        }
    });
}
