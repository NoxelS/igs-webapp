import { connection } from '@configs/database';
import logger from '@shared/logger';
import { isLoggedIn, verifyUser } from '@shared/passport.utils';
import { sendEmail } from '@shared/utils';
import { hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { NextFunction, Request, Response, Router } from 'express';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import passport from 'passport';
import { join } from 'path';

import { ErrorResponse, LoginResponse, SuccessResponse, UserListResponse } from '../models/response.model';
import { User } from '../models/user.model';


// Init shared
const router = Router();

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    verifyUser(username, password, (err, user) => {
        if (err) {
            res.json(new ErrorResponse(err));
        } else if (user) {
            const userId = user.id;
            const expiresIn = '1d';
            const PRIV_KEY = readFileSync(join(__dirname, '../keys/id_rsa_priv.pem'));
            const payload = {
                sub: userId,
                iat: Date.now()
            };
            const signedToken = sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });
            res.json(new LoginResponse(signedToken, expiresIn, user));
        } else {
            res.json(new ErrorResponse('Could not login.'));
        }
    });
});

/** Get list of all users (superuser access only) */
router.get('/get_users', isLoggedIn(), async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.isSuperUser) {
        connection.query('SELECT * FROM users;', (err, result) => {
            if (err) {
                res.json(new ErrorResponse(err.message));
            } else {
                res.json(
                    new UserListResponse(
                        result.map((row: any) => {
                            return new User(row.username, row.email, row.id, row.isSuperUser, row.name, row.regionalgruppe);
                        })
                    )
                );
            }
        });
    } else {
        return new ErrorResponse('Unauthorized');
    }
});

router.post('/create_user', isLoggedIn(), async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const isSuperUser = req.body.isSuperUser;
    const regionalgruppe = req.body.regionalgruppe;

    if (res.locals.user.isSuperUser) {
        hash(password, Number(process.env.AUTH_SALT_ROUNDS), (error, passwordHash) => {
            if (error) {
                res.json(new SuccessResponse());
            } else {
                connection.query(
                    'INSERT INTO users (`username`, `password`, `email`, `name`, `isSuperUser`, `regionalgruppe`) VALUES (?, ?, ?,?,?,?)',
                    [username, passwordHash, email, name, isSuperUser, regionalgruppe],
                    err => {
                        res.json(err ? new ErrorResponse(err.message) : new SuccessResponse());
                    }
                );
            }
        });
    } else {
        return new ErrorResponse('Unauthorized');
    }
});

router.post('/remove_user', isLoggedIn(), async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;

    if (res.locals.user.isSuperUser) {
        connection.query('DELETE FROM users WHERE (`id` = ?)', [id], (err, result) => {
            if (err) {
                res.json(new ErrorResponse(err.message));
            } else {
                res.json(new SuccessResponse());
            }
        });
    } else {
        return new ErrorResponse('Unauthorized');
    }
});

/**
 * Sends an email wit ha recovery key to the person who lost their password.
 * The recovery key expires in one day and can only be used once.
 */
router.post('/recovery', async (req: Request, res: Response) => {
    const email = req.body.email;
    const recoveryKey = randomBytes(20).toString('hex').toUpperCase().slice(0, 8);

    connection.query('SELECT id FROM users WHERE (email = ?);', [email], async (err, result) => {
        if (err) {
            res.json(new ErrorResponse(err.message));
        } else if (result.length === 0) {
            res.json(new ErrorResponse('Unknown email'));
        } else {
            const userId = result[0].id;

            connection.query('DELETE FROM `igs`.`recovery` WHERE (`user_id` = ?);', [userId], async err => {
                if (err) {
                    res.json(new ErrorResponse(err.message));
                } else {
                    const oneDayInMillis = 86400000;
                    connection.query(
                        'INSERT INTO recovery (`user_id`, `key`, `expires`) VALUES (?,?,?);',
                        [userId, recoveryKey, new Date().getTime() + oneDayInMillis],
                        async (err, result) => {
                            if (err) {
                                res.json(new ErrorResponse(err.message));
                            } else {
                                await sendEmail('Recovery <test@noel-s.ch>', email, 'Recovery!', `<b>Recovery key = ${recoveryKey}</b>`);
                                res.json(new SuccessResponse());
                            }
                        }
                    );
                }
            });
        }
    });
});

/**
 * Use this with a valid recovery key to change your password.
 */
router.post('/recover_password', async (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;
    const recoveryKey = req.body.recoveryKey;

    connection.query('SELECT * FROM igs.recovery WHERE (`key` = ?);', recoveryKey, (err, result) => {
        if (err) {
            res.json(new ErrorResponse(err.message));
        } else if (result.length === 0) {
            res.json(new ErrorResponse('Revovery key is expired.'));
        } else {
            if (result[0].expires - new Date().getTime() > 0) {
                const userId = result[0].user_id;
                hash(password, Number(process.env.AUTH_SALT_ROUNDS), (error, passwordHash) => {
                    if (error) {
                        res.json(new ErrorResponse(error.message));
                    } else {
                        connection.query('UPDATE `igs`.`users` SET `password` = ? WHERE (`id` = ?);', [passwordHash, userId], err => {
                            if (err) {
                                res.json(new ErrorResponse(err.message));
                            } else {
                                connection.query('DELETE FROM `igs`.`recovery` WHERE (`key` = ?);', [recoveryKey], err => {
                                    res.json(err ? new ErrorResponse(err.message) : new SuccessResponse());
                                });
                            }
                        });
                    }
                });
            } else {
                res.json(new ErrorResponse('Revovery key is expired.'));
            }
        }
    });
});

export default router;
