import { connection } from '@configs/database';
import { isLoggedIn, verifyUser } from '@shared/passport.utils';
import { sendEmail } from '@shared/utils';
import { hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { NextFunction, Request, Response, Router } from 'express';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import passport from 'passport';
import { join } from 'path';

import { ErrorResponse, LoginResponse, SuccessResponse } from '../models/response.model';


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
            console.log(user);
            res.json(new LoginResponse(signedToken, expiresIn, user));
        } else {
            res.json(new ErrorResponse('Could not login.'));
        }
    });
});

router.post('/create_user', isLoggedIn(), async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // TODO: Maybe only an admin should create new users or needs a token

    hash(password, Number(process.env.AUTH_SALT_ROUNDS), (error, passwordHash) => {
        if (error) {
            res.json(new SuccessResponse());
        } else {
            connection.query('INSERT INTO users (`username`, `password`, `email`) VALUES (?, ?, ?)', [username, passwordHash, email], err => {
                res.json(err ? new ErrorResponse(err.message) : new SuccessResponse());
            });
        }
    });
});

/**
 * Sends an email wit ha recovery key to the person who lost their password.
 * The recovery key expires in one day and can only be used once.
 */
router.post('/recovery', async (req: Request, res: Response) => {
    const email = req.body.email;
    const recoveryKey = randomBytes(20).toString('hex').toUpperCase().slice(0,8);

    connection.query('SELECT id FROM users WHERE (email = ?);', [email], async (err, result) => {
        if (err) {
            res.json(new ErrorResponse(err.message));
        } else if (result.length === 0) {
            res.json(new ErrorResponse('Unknown email'));
        } else {
            const userId = result[0].id;

            connection.query('DELETE FROM `igs`.`recovery` WHERE (`user_id` = ?);', [userId], async (err) => {
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
                                await sendEmail(
                                    'Recovery <test@noel-s.ch>',
                                    email,
                                    'Recovery!',
                                    `<b>Recovery key = ${recoveryKey}</b>`
                                );
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
