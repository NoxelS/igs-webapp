import { Request, Response, Router } from 'express';


// Init shared
const router = Router();

router.get('/all', async (req: Request, res: Response) => {
    return res.json({test: "Test"});
});

export default router;
