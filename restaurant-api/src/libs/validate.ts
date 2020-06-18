import { Schema, ValidationResult } from '@hapi/joi';
import { RequestValidationSchema } from 'request-validation-schema';
import { Response, NextFunction } from 'express';
import { RequestWithValidated } from 'request-with-validated';
import MultiValidationError from './errors/multi-validation-error';

function validate(input: any, schema?: Schema): ValidationResult {
    if (!schema) {
        return {
            error: null,
            value: input
        };
    }

    return schema.validate(input, { abortEarly: false });
}

export default function (validationSchema: RequestValidationSchema) {
    return (req: RequestWithValidated, res: Response, next: NextFunction) => {
        req.validated = {};

        [
            {
                key: 'params',
                schema: validationSchema.params,
                input: req.params,
            },
            {
                key: 'query',
                schema: validationSchema.query,
                input: req.query,
            },
            {
                key: 'body',
                schema: validationSchema.body,
                input: req.body,
            },
            {
                key: 'headers',
                schema: validationSchema.headers,
                input: req.headers,
            },
        ].forEach((item) => {
            let { error, value } = validate(item.input, item.schema);

            if (error && error.details && error.details.length) {
                const errors = error.details.map((err) => ({
                    message: err.message,
                    slug: `invalid-${err.context.key}-${err.type.replace(/\./g, '-').toLowerCase()}`,
                    details: { path: err.path },
                }));

                throw new MultiValidationError('Validation error', errors);
            }

            req.validated[item.key] = value;
        });

        return next();
    };
}
