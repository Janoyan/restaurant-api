import Joi from '@hapi/joi';
import { RequestValidationSchema } from 'request-validation-schema';
import MongoId from '../libs/mongo-object-id-validator';
import TillToday from '../libs/till-today-validator';

export const getRestaurantById: RequestValidationSchema = {
    params: Joi.object().keys({
        id: Joi.custom(MongoId).required(),
    }),
}

export const commentRestaurant: RequestValidationSchema = {
    params: Joi.object().keys({
        id: Joi.custom(MongoId).required(),
    }),
    body: Joi.object().keys({
        text: Joi.string().min(3).max(300).required(),
        star: Joi.number().integer().min(1).max(5).required(),
        visitDate: Joi.date().custom(TillToday).required()
    }),
}
