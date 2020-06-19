import passport from 'passport';
import passportLocal from 'passport-local';
import { User, UserDocument } from '../models/user';
import { verifyToken } from '../libs/access-token';
import { Response, NextFunction} from "express";
import { RequestWithValidated } from 'request-with-validated';
import UnauthorizedError from "../libs/errors/unauthorized-error";

export function configure() {
    const LocalStrategy = passportLocal.Strategy;

    passport.serializeUser<any, any>((user: UserDocument, done: Function) => {
        done(undefined, user.id);
    });

    passport.deserializeUser((id: string, done: Function) => {
        User.findById(id, (err: Error, user: UserDocument) => {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({ usernameField: 'username' }, (username: string, password: string, done: Function) => {
        User.findOne({ username }, async (err: Error, user: UserDocument) => {
            if (err) { return done(err); }
            if (!user) {
                return done(undefined, false, { message: `Username ${username} not found.` });
            }

            const isValidPassword = await user.comparePassword(password);
            if (isValidPassword) {
                return done(undefined, user);
            }

            return done(undefined, false, { message: 'Invalid username or password.' });
        });
    }));
}

export function authorize(req: RequestWithValidated, res: Response, next: NextFunction) {
    try {
        req.user = verifyToken(req.headers.authorization);
    } catch (err) {
        const error = new UnauthorizedError('Unauthorized');
        next(error);
    }
}
