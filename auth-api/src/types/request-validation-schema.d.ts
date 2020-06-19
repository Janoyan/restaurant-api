import { Schema } from '@hapi/joi';


interface RequestValidationSchema {
    params?: Schema,
    headers?: Schema,
    body?: Schema,
    query?: Schema,
}
