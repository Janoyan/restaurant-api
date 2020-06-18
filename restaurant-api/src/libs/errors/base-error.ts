export default class BaseError extends Error {
    statusCode: number;
    errors?: any[];
    message: string;
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}
