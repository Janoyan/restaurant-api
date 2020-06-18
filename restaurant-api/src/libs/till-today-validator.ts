import { CustomHelpers } from '@hapi/joi';

export default function (value: any, helper: CustomHelpers) {
    const timestamp = new Date(value).getTime();
    if (timestamp <= Date.now()) {
        return value;
    }

    return helper.message({ custom: 'Date should be less than or equal today' });
}
