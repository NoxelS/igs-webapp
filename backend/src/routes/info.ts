import { connection } from '@configs/database';
import { isLoggedIn } from '@shared/passport.utils';
import { Request, Response, Router } from 'express';
import { readFileSync } from 'fs';
import { verify } from 'jsonwebtoken';
import { join } from 'path';

import { ErrorResponse, IgsResponse } from '../models/response.model';
import { User } from '../models/user.model';


// Init shared
const router = Router();

router.post('/user', isLoggedIn(), async (req: Request, res: Response) => {
    const PRIV_KEY = readFileSync(join(__dirname, '../keys/id_rsa_priv.pem'));
    const authHeader = req.headers['authorization'];
    const token = authHeader && (authHeader.split(' ')[1] as any);
    verify(token, PRIV_KEY, { algorithms: ['RS256'] }, (err, subPrperties) => {
        if (err) {
            res.json(new ErrorResponse(err.message));
        } else {
            connection.query('SELECT * FROM igs.users WHERE (id=?);', [(subPrperties as any).sub], (err, results) => {
                if (err) {
                    res.json(new ErrorResponse(err.message));
                } else {
                    res.json(new IgsResponse<User>(new User(results[0].username, results[0].email, results[0].id)));
                }
            });
        }
    });
});

router.post('/userid', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        const userId = (req as any).session.passport.user.user_id;
        res.json(new IgsResponse(userId));
    } else {
        res.json(new ErrorResponse('The user is not logged in.'));
    }
});

export default router;
