import { connection } from '@configs/database';
import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { verify } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { join } from 'path';

import { User } from '../models/user.model';


export function setLocals(req: Request, res: Response, next: NextFunction) {
    const PRIV_KEY = readFileSync(join(__dirname, '../keys/id_rsa_priv.pem'));
    const authHeader = req.headers['authorization'];
    console.log("Set locals");
    if(authHeader) {
        const token = authHeader && (authHeader.split(' ')[1] as any);
        verify(token, PRIV_KEY, { algorithms: ['RS256'] }, (err, subPrperties) => {
            if(err) {
                next();
            } else {
                connection.query('SELECT username, email, isSuperUser FROM users WHERE (id = ?)', [(subPrperties as any).sub], (err, result) => {
                    if(!err && result.length === 1) {
                        res.locals.user = <User> new User(result[0].username, result[0].email, (subPrperties as any).sub, result[0].isSuperUser);
                        console.log(res.locals.user);
                    }
                    next();
                });
            }
        });
    } else {
        // Skip unauthorized user
        next();
    }
}

export async function sendEmail(from: string, to: string, subject: string, html: string, callback?: (info: any) => void) {
    const transporter = createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: !!process.env.MAIL_SECURE,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const info = await transporter.sendMail({
        from: `"IGS" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html
    });

    if (typeof callback === 'function') {
        callback(info);
    }
}
