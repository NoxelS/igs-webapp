import { connection } from '@configs/database';
import { isLoggedIn } from '@shared/passport.utils';
import { sendEmail } from '@shared/utils';
import { hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { ErrorResponse, IgsResponse, SuccessResponse } from 'src/models/response.model';
import { User } from 'src/models/user.model';


// Init shared
const router = Router();

router.post(
    '/login',
    passport.authenticate('local', {
        failureMessage: true
    }),
    async (req, res) => {
        if (req.user) {
            const userId = (req.user as any).user_id;
            connection.query('SELECT * FROM igs.users WHERE (id=?);', [userId], (err, results) => {
                if (err) {
                    res.json(new ErrorResponse(err.message));
                } else {
                    res.json(new IgsResponse<User>(new User(results[0].username, results[0].email, results[0].id)));
                }
            });
        } else {
            res.json(new ErrorResponse('Could not login.'));
        }
    }
);

router.post('/logout', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        req.logout();
        if (req.session) {
            req.session.destroy(err => res.json(err ? new ErrorResponse(err) : new SuccessResponse()));
        } else {
            res.json(new ErrorResponse('No session was found.'));
        }
    } else {
        res.json(new ErrorResponse('No session was found.'));
    }
});

router.post('/create_user', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
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

/** TODO: Get id by email */
router.post('/recovery', isLoggedIn, async (req: Request, res: Response) => {
    const email = req.body.email;
    const recoveryKey = randomBytes(20).toString('hex');
    connection.query(
        'INSERT INTO recovery (`user_id`, `key`, `expires`) VALUES (?,?,?);',
        [(req as any).session.passport.user.user_id, recoveryKey, new Date().getTime() + 1000 * 60 * 60 * 24],
        async (err, result) => {
            if (err) {
                res.json(new ErrorResponse(err.message));
            } else {
                await sendEmail(
                    'Recovery <test@noel-s.ch>',
                    email,
                    'Recovery!',
                    `<b>Recovery key = ${recoveryKey}</b></br><a href="localhost:3000/recover_password">`
                );
                res.json(new SuccessResponse());
            }
        }
    );
});

router.post('/recover_password', async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    const recoveryKey = req.body.recoveryKey;

    connection.query('SELECT * FROM igs.recovery WHERE (`key` = ?);', recoveryKey, (err, result) => {
        if (err) {
            res.json({ success: false });
        } else {
            if (result[0].expires - new Date().getTime() > 0) {
                res.json({ success: true });
            } else {
                res.json({ success: false, reason: 'expired' });
            }
        }
    });
});

export default router;
