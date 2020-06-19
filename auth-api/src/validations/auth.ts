import Joi from '@hapi/joi';
import { RequestValidationSchema } from 'request-validation-schema';

export const signUpUser: RequestValidationSchema = {
    body: Joi.object().keys({
        firstName: Joi.string().min(2).max(30).required(),
        lastName: Joi.string().min(2).max(30).required(),
        username: Joi.string().min(3).max(30).lowercase().required(),
        password: Joi.string().min(3).max(30).required(),
    }),
}

export const signInUser: RequestValidationSchema = {
    body: Joi.object().keys({
        username: Joi.string().min(3).max(30).lowercase().required(),
        password: Joi.string().min(3).max(30).required(),
    }),
}
