import { NextFunction, Request, Response } from 'express';


export function setLocals(req: Request, res: Response, next: NextFunction) {
    res.locals.loggedIn = req.isAuthenticated();
    next();
}