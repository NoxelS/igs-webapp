import { connection } from '@configs/database';
import { isLoggedIn, verifyUser } from '@shared/passport.utils';
import { hash } from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import passport from 'passport';
import { join } from 'path';
import { ErrorResponse, LoginResponse, SuccessResponse } from 'src/models/response.model';


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
            const signedToken = sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
            res.json(new LoginResponse(signedToken, expiresIn, user));
        } else {
            res.json(new ErrorResponse('Could not login.'));
        }
    });
});

router.post('/protected', isLoggedIn(), async (req, res) => {
    res.json({ test: true });
});

router.post('/create_user', isLoggedIn() , async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

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

// /** TODO: recovery */
// router.post('/recovery', async (req: Request, res: Response) => {
//     const email = req.body.email;
//     const recoveryKey = randomBytes(20).toString('hex');
//     connection.query(
//         'INSERT INTO recovery (`user_id`, `key`, `expires`) VALUES (?,?,?);',
//         [(req as any).session.passport.user.user_id, recoveryKey, new Date().getTime() + 1000 * 60 * 60 * 24],
//         async (err, result) => {
//             if (err) {
//                 res.json(new ErrorResponse(err.message));
//             } else {
//                 await sendEmail(
//                     'Recovery <test@noel-s.ch>',
//                     email,
//                     'Recovery!',
//                     `<b>Recovery key = ${recoveryKey}</b></br><a href="localhost:3000/recover_password">`
//                 );
//                 res.json(new SuccessResponse());
//             }
//         }
//     );
// });

// router.post('/recover_password', async (req: Request, res: Response, next: NextFunction) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const recoveryKey = req.body.recoveryKey;

//     connection.query('SELECT * FROM igs.recovery WHERE (`key` = ?);', recoveryKey, (err, result) => {
//         if (err) {
//             res.json({ success: false });
//         } else {
//             if (result[0].expires - new Date().getTime() > 0) {
//                 res.json({ success: true });
//             } else {
//                 res.json({ success: false, reason: 'expired' });
//             }
//         }
//     });
// });

export default router;
