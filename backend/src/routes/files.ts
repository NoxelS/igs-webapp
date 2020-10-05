import { connection } from '@configs/database';
import { Request, Response, Router } from 'express';
import { readFileSync, unlink } from 'fs';
import { verify } from 'jsonwebtoken';
import passport from 'passport';
import { join } from 'path';
import { ErrorResponse, ShortFileListResponse, SuccessResponse } from 'src/models/response.model';
import { ShortFile } from 'src/models/short-file.model';


// Init shared
const router = Router();

router.post('/list', async (req: Request, res: Response) => {
    connection.query('SELECT * FROM files', (err, result) => {
        if (err) {
            res.json(new ErrorResponse(err.message));
        } else {
            res.json(
                new ShortFileListResponse(
                    result.map(
                        (dbEntry: any) =>
                            <ShortFile>{
                                name: dbEntry.name,
                                id: dbEntry.id,
                                author_id: dbEntry.author_id,
                                mimetype: dbEntry.mimetype,
                                creationDate: dbEntry.creationDate,
                                description: dbEntry.description
                            }
                    )
                )
            );
        }
    });
});

router.post('/create', async (req: Request, res: Response) => {
    const PRIV_KEY = readFileSync(join(__dirname, '../keys/id_rsa_priv.pem'));
    const authHeader = req.headers['authorization'];
    const token = authHeader && (authHeader.split(' ')[1] as any);
    verify(token, PRIV_KEY, { algorithms: ['RS256'] }, (err, subPrperties) => {
        if (err) {
            res.json(new ErrorResponse(err.message));
        } else {
            const userId = (subPrperties as any).sub;
            const file = req.files?.file;
            const { description } = req.body;
            if (file) {
                connection.query(
                    'INSERT INTO `igs`.`files` (`name`, `author_id`, `mimetype`, `creationDate`, `description`) VALUES (?, ?, ?, ?, ?);',
                    [file.name, userId, file.mimetype, new Date().getTime(), description],
                    (err, result) => {
                        if (err) {
                            res.json(new ErrorResponse(err.message));
                        } else {
                            const path = join(__dirname, '../uploads/' + result.insertId + '.' + file.name.split('.')[file.name.split('.').length - 1]);
                            file.mv(path);
                            connection.query('UPDATE `igs`.`files` SET `path` = ? WHERE (`id` = ?);', [path, result.insertId], err => {
                                res.json(err ? new ErrorResponse(err.message) : new SuccessResponse());
                            });
                        }
                    }
                );
            } else {
                res.json(new ErrorResponse('No file attached.'));
            }
        }
    });
});

router.post('/remove', async (req: Request, res: Response) => {
    const { id } = req.body;
    if (id) {
        connection.query('SELECT path FROM files WHERE (id = ?);', [id], (err, result) => {
            if (err) {
                res.json(new ErrorResponse(err.message));
            } else if(!result.length || !result[0].path) {
                res.json(new ErrorResponse('No file found.'));
            } else {
                unlink(result[0].path, err => {
                    if (err) {
                        res.json(new ErrorResponse(err.message));
                    } else {
                        connection.query('DELETE FROM `igs`.`files` WHERE (`id` = ?);', [id], (err, result) => {
                            res.json(err ? new ErrorResponse(err.message) : new SuccessResponse());
                        });
                    }
                });
            }
        });
    } else {
        res.json(new ErrorResponse('No file specified.'));
    }
});

router.post('/get/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
        connection.query('SELECT path FROM files WHERE (id = ?);', [id], (err, result) => {
            if (err) {
                res.json(new ErrorResponse(err.message));
            } else if(!result.length || !result[0].path) {
                res.json(new ErrorResponse('No file found.'));
            } else {
                res.download(result[0].path, err => {
                    if (err) res.json(new ErrorResponse(err.message));
                });
            }
        });
    } else {
        res.json(new ErrorResponse('No file specified.'));
    }
});

export default router;