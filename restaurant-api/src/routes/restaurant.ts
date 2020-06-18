import  { Router } from 'express'
import * as core from 'express-serve-static-core';

import validate from '../libs/validate';
import asyncMiddlewareWrapper from '../libs/aync-error-wrapper';
import * as controllers from '../controllers/restaurant';
import { getRestaurantById, commentRestaurant } from '../validations/restaurant';
import { authorize } from '../services/authorize';

const router: core.Router = Router();

router.get(
    '/',
    authorize,
    asyncMiddlewareWrapper(controllers.listRestaurants)
);

router.get(
    '/:id',
    validate(getRestaurantById),
    authorize,
    asyncMiddlewareWrapper(controllers.getRestaurantById)
);

router.post(
    '/:id/comment',
    validate(commentRestaurant),
    authorize,
    asyncMiddlewareWrapper(controllers.commentRestaurant)
);

export default router;
