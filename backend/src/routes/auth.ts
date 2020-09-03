import { isLoggedIn } from '@shared/passport.utils';
import { hash } from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { connection } from 'src/config/database';


// Init shared
const router = Router();

router.post(
    '/login',
    passport.authenticate('local', {
        failureMessage: true
    }),
    async (req, res, next) => {
        res.json({
            user: req.user
        });
    }
);

router.post('/logout',  async (req: Request, res: Response, next: NextFunction) => {
    req.logout();
    if(req.session) {
        req.session.destroy((err) => {
            if(err) {
                res.json(err)
            } else {
                res.json({success: true})
            }
        });
    } else {
        res.json(new Error('No session found'))
    }
});

router.post('/create_user', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    hash(password, Number(process.env.AUTH_SALT_ROUNDS), function (err, hash) {
        connection.query('INSERT INTO users (`username`, `password`) VALUES (?, ?)', [username, hash], function (err, result, fields) {
            if (err) {
                return next(new Error(err.message));
            } else {
                res.json({ success: true });
            }
        });
    });
});

export default router;
