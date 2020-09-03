import { Request, Response, Router } from 'express';


// Init shared
const router = Router();

router.get('/login', async (req: Request, res: Response) => {
    res.cookie('test', 'test');
    return res.json({ test: 'Test' });
});

export default router;
