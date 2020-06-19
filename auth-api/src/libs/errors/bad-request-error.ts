import BaseError from './base-error';

export default class BadRequestError extends BaseError {
    constructor(message: string) {
        super(message);
        this.statusCode = 400;
    }
}
