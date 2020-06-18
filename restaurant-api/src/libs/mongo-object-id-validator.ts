import { Types } from 'mongoose';
import { CustomHelpers } from '@hapi/joi';

export default function (value: any, helper: CustomHelpers) {
    if (Types.ObjectId.isValid(value)) {
        return value;
    }

    return helper.message({ custom: 'Invalid object id' });
}
