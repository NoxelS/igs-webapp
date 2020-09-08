import { connection } from '@configs/database';
import { Request, Response, Router } from 'express';
import { ErrorResponse, IgsResponse } from 'src/models/response.model';
import { User } from 'src/models/user.model';


// Init shared
const router = Router();

router.post('/user', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        const userId = (req as any).session.passport.user.user_id;
        connection.query('SELECT * FROM igs.users WHERE (id=?);', [userId], (err, results) => {
            if (err) {
                res.json(new ErrorResponse(err.message));
            } else {
                res.json(new IgsResponse<User>(new User(results[0].username, results[0].email, results[0].id)));
            }
        });
    } else {
        res.json(new ErrorResponse('The user is not logged in.'));
    }
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
