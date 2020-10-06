import { isLoggedIn } from '@shared/passport.utils';
import { Request, Response, Router } from 'express';

import { IgsResponse } from '../models/response.model';
import { User } from '../models/user.model';


// Init shared
const router = Router();

router.post('/user', isLoggedIn(), async (req: Request, res: Response) => {
    res.json(new IgsResponse<User>(res.locals.user as User));
});

router.post('/userid', isLoggedIn(), async (req: Request, res: Response) => {
    res.json(new IgsResponse<string>((res.locals.user as User).id));
});

export default router;
