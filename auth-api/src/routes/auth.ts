import  { Router } from 'express'
import * as core from 'express-serve-static-core';

import validate from '../libs/validate';
import asyncMiddlewareWrapper from '../libs/aync-error-wrapper';
import * as controllers from '../controllers/auth';
import { signUpUser, signInUser } from '../validations/auth';

const router: core.Router = Router();

router.post(
    '/signup',
    validate(signUpUser),
    asyncMiddlewareWrapper(controllers.signUpUser)
);

router.post(
    '/signin',
    validate(signInUser),
    asyncMiddlewareWrapper(controllers.signInUser)
);

export default router;
