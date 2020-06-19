import { NextFunction, Response } from 'express';
import { User, UserDocument } from '../models/user';
import { RequestWithValidated } from 'request-with-validated';
import BadRequestError from '../libs/errors/bad-request-error';
import UnauthorizedError from '../libs/errors/unauthorized-error';
import { generateToken } from '../libs/access-token';
import passport from 'passport';

export async function signUpUser(req: RequestWithValidated, res: Response) {
    const userData = req.validated.body;
    const exists = await User.countDocuments({ username: userData.username });

    if (exists) {
        throw new BadRequestError('username already exists');
    }

    const user = new User(userData);
    await user.save();

    res.status(200);
    res.json(user);
}

export async function signInUser(req: RequestWithValidated, res: Response, next: NextFunction) {
    passport.authenticate('local', (err: Error, user: UserDocument) => {
        if (err || !user) {
            const error = new UnauthorizedError('Invalid credentials');
            return next(error);
        }

        const token = generateToken(user.toJSON());

        res.status(200);
        res.json({
            token,
        });
    })(req, res, next);
}
