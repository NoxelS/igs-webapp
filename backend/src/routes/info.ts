import { isLoggedIn } from '@shared/passport.utils';
import { Request, Response, Router } from 'express';

import { IgsResponse } from '../models/response.model';
import { User } from '../models/user.model';


const checkDiskSpace = require('check-disk-space');
// Init shared
const router = Router();

router.get('/user', isLoggedIn(), async (req: Request, res: Response) => {
    res.json(new IgsResponse<User>(res.locals.user as User));
});

router.get('/userid', isLoggedIn(), async (req: Request, res: Response) => {
    res.json(new IgsResponse<string>((res.locals.user as User).id));
});

/** TODO: Make disk-space pretty */
router.get('/disk-space', isLoggedIn(), async (req: Request, res: Response) => {
    const space = await checkDiskSpace('C:\\usr\\src\\app\\files');
    res.json(new IgsResponse(space));
});

export default router;
