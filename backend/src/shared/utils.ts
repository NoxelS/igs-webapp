import { NextFunction, Request, Response } from 'express';
import { createTransport } from 'nodemailer';


export function setLocals(req: Request, res: Response, next: NextFunction) {
    // TODO:
    next();
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
