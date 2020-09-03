import { connection } from '@configs/database';
import { compare } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';


// Checkt if user is logged in
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json(new Error('Unauthorized'));
    }
}

// Used to login
export function verifyCallback(username: string, password: string, done: any) {
    connection.query('SELECT id, password FROM users WHERE username = ?', [username], (error, results, fields) => {
        if (error || results.length === 0) {
            done(error);
        } else {
            const hash = results[0].password.toString();
            compare(password, hash, (err, response) => {
                if (response === true) {
                    return done(null, { user_id: results[0].id });
                } else {
                    return done(null, false);
                }
            });
        }
    });
}

export function serializeUser(user: any, done: ((err: any, id?: unknown) => void)) {
    done(null, user);
}

export function deserializeUser(user: any, done: ((err: any, id?: unknown) => void)) {
    done(null,  user);
}
