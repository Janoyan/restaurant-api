import config from 'config';
import jwt from 'jsonwebtoken';

export function generateToken(user: UserDocument): string {
    return jwt.sign(user, config.get('token.secret'), { expiresIn: config.get('token.exp') });
}

export function verifyToken(token: string): object | string {
    return jwt.verify(token, config.get('token.secret'));
}
