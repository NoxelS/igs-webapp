import { Router } from 'express';

import ArticleRouter from './articles';
import AuthRouter from './auth';
import FileRouter from './files';
import InfoRouter from './info';


// Init router and path
const router = Router();

// Add sub-routes
router.use('/auth', AuthRouter);
router.use('/articles', ArticleRouter);
router.use('/files', FileRouter);
router.use('/info', InfoRouter);

// Export the base-router
export default router;
