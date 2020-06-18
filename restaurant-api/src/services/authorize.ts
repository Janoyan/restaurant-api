import { RequestWithValidated } from 'request-with-validated';
import { NextFunction, Response } from 'express';
import { verifyToken } from '../libs/access-token';
import UnauthorizedError from '../libs/errors/unauthorized-error';

export function authorize(req: RequestWithValidated, res: Response, next: NextFunction) {
    try {
        req.user = verifyToken(req.headers.authorization);
        next();
    } catch (err) {
        const error = new UnauthorizedError('Unauthorized');
        next(error);
    }
}
