import BaseError from './base-error';

export default class MultiValidationError extends BaseError {
    constructor(message: string, errors: any) {
        super(message);

        this.statusCode = 409;
        this.errors = errors;
    }
}
