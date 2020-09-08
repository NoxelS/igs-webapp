import { connection } from '@configs/database';
import { Request, Response, Router } from 'express';
import { Article } from 'src/models/article.model';
import { ErrorResponse, IgsResponse, SuccessResponse } from 'src/models/response.model';


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

router.post('/create', async (req: Request, res: Response) => {
    const article: Article = req.body.article;
    connection.query(
        'INSERT INTO `igs`.`articles` (`title`, `views`, `creationDate`, `imageUrl`, `content`) VALUES (?,?,?,?,?)',
        [article.title, article.views, article.creationDate, article.imageUrl, article.content],
        err => {
            res.json(err ? new ErrorResponse(err.message) : new SuccessResponse());
        }
    );
});

router.post('/edit', async (req: Request, res: Response) => {
    return res.json(new ErrorResponse('Not implemented yes'));
});

router.post('/remove', async (req: Request, res: Response) => {
    const { id } = req.body.article as Article;
    return res.json(new ErrorResponse('Not implemented yes'));
});

export default router;
