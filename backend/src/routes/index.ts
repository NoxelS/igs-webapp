import { Router } from 'express';

import ArticleRouter from './articles';
import AuthRouter from './auth';


// Init router and path
const router = Router();

// Add sub-routes
router.use('/auth', AuthRouter);
router.use('/articles', ArticleRouter);
// router.use('/articles', isLoggedIn, ArticleRouter);

// Export the base-router
export default router;
