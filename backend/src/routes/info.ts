import { isLoggedIn } from '@shared/passport.utils';
import checkDiskSpace from 'check-disk-space';
import { Request, Response, Router } from 'express';

import { ErrorResponse, IgsResponse } from '../models/response.model';
import { User } from '../models/user.model';


// Init shared
const router = Router();

router.get('/user', isLoggedIn(), async (req: Request, res: Response) => {
    res.json(new IgsResponse<User>(res.locals.user as User));
});

router.get('/userid', isLoggedIn(), async (req: Request, res: Response) => {
    res.json(new IgsResponse<number>((res.locals.user as User).id));
});

/** TODO: Make disk-space pretty */
router.get('/disk-space', isLoggedIn(), async (req: Request, res: Response) => {
    if (res.locals.user.isSuperUser) {
        let space;
        if (process.env.NODE_ENV === 'production') {
            space = await checkDiskSpace('/usr');
        } else {
            space = await checkDiskSpace('C:\\usr\\src\\app\\files');
        }
        res.json(new IgsResponse(space));
    } else {
        res.json(new ErrorResponse('You need to be superuser to access this function.'));
    }
});

export default router;
