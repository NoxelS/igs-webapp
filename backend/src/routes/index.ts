import { Router } from 'express';

import ArticleRouter from './articles';
import AuthRouter from './auth';


// Init router and path
const router = Router();

// Add sub-routes
router.use('/articles', ArticleRouter);
router.use('/auth', AuthRouter);

// Export the base-router
export default router;
