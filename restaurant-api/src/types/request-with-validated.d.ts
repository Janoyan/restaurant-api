import { Request } from 'express';

interface RequestWithValidated extends Request{
    validated: any,
    user?: any,
}
