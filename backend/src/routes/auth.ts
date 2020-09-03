import { isLoggedIn } from '@shared/passport.utils';
import { sendEmail } from '@shared/utils';
import { hash } from 'bcrypt';
import { randomBytes } from 'crypto';
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
    hash(password, Number(process.env.AUTH_SALT_ROUNDS), (error, passwordHash) => {
        if(error) {
            res.json({ success: true });
        } else {
            connection.query('INSERT INTO users (`username`, `password`) VALUES (?, ?)', [username, passwordHash], (err, result, fields) => {
                if (err) {
                    return next(new Error(err.message));
                } else {
                    res.json({ success: true });
                }
            });
        }
    });
});

/** TODO: Get id by email */
router.post('/recovery', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    const recoveryKey =  randomBytes(20).toString('hex');
    connection.query('INSERT INTO recovery (`user_id`, `key`, `expires`) VALUES (?,?,?);', [(req as any).session.passport.user.user_id, recoveryKey, (new Date().getTime() + 1000 * 60 * 60 * 24)], async (err, result) => {
        if(err) {
            console.log(err);
        } else {
            await sendEmail('Recovery <test@noel-s.ch>', 'noel@schwabenland.ch', 'Recovery!', `<b>Recovery key = ${recoveryKey}</b></br><a href="localhost:3000/recover_password">`)
            res.json({user: (req as any).session.passport.user.user_id})
        }
    })
});

router.post('/recover_password',  async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    const recoveryKey = req.body.recoveryKey;

    connection.query('SELECT * FROM igs.recovery WHERE (`key` = ?);', recoveryKey, (err, result) => {
        if(err) {
            res.json({success: false});
        } else {
            if((result[0].expires - new Date().getTime()) > 0) {
                res.json({success: true})
            } else {
                res.json({success: false, reason: 'expired'});
            }
        }
    })
})

export default router;
