import { connection } from '@configs/database';
import { isLoggedIn } from '@shared/passport.utils';
import { Request, Response, Router } from 'express';

import { Article } from '../models/article.model';
import { ErrorResponse, IgsResponse, SuccessResponse } from '../models/response.model';


// Init shared
const router = Router();

router.get('/list', async (req: Request, res: Response) => {
    connection.query('SELECT * FROM igs.articles;', [], (err, results) => {
        if (err) {
            res.json(new ErrorResponse(err.message));
        } else {
            res.json(new IgsResponse(results.map((row: any) => new Article(row.title, row.views, row.creationDate, row.imageUrl, row.content, row.id))));
        }
    });
});

router.post('/create', isLoggedIn(), async (req: Request, res: Response) => {
    const article: Article = req.body as Article;
    connection.query(
        'INSERT INTO `igs`.`articles` (`title`, `views`, `creationDate`, `imageUrl`, `content`) VALUES (?,?,?,?,?)',
        [article.title, article.views, article.creationDate, article.imageUrl, article.content],
        err => {
            res.json(err ? new ErrorResponse(err.message) : new SuccessResponse());
        }
    );
});

router.post('/edit', isLoggedIn(), async (req: Request, res: Response) => {
    const article: Article = req.body as Article;
    connection.query('SELECT * FROM igs.articles WHERE (id = ?);', [article.id], (err, result) => {
        if (err) {
            res.json(new ErrorResponse(err.message));
        } else if(!result.length) {
            res.json(new ErrorResponse('The article was not found.'));
        } else {
            connection.query(
                'UPDATE `igs`.`articles` SET `title` = ?, `views` = ?, `creationDate` = ?, `imageUrl` = ?, `content` = ? WHERE (`id` = ?);',
                [article.title, article.views, article.creationDate, article.imageUrl, article.content, article.id],
                err => {
                    res.json(err ? new ErrorResponse(err.message) : new SuccessResponse());
                }
            );
        }
    });
});

router.post('/remove', isLoggedIn(), async (req: Request, res: Response) => {
    const { id } = req.body as Article;
    connection.query('SELECT * FROM igs.articles WHERE (id = ?);', [id], (err, result) => {
        if (err) {
            res.json(new ErrorResponse(err.message));
        } else if(!result.length) {
            res.json(new ErrorResponse('The article was not found.'));
        } else {
            connection.query('DELETE FROM `igs`.`articles` WHERE (`id` = ?);', [id], err => {
                res.json(err ? new ErrorResponse(err.message) : new SuccessResponse());
            });
        }
    });
});

export default router;
