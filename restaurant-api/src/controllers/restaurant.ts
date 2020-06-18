import { Request, Response } from 'express';
import { Restaurant } from '../models/restaurant';
import { Comment } from '../models/comment';
import { RequestWithValidated } from 'request-with-validated';
import NotFoundError from '../libs/errors/not-found-error';
import * as kafka from '../services/kafka';

export async function listRestaurants(req: Request, res: Response) {
    const restaurants = await Restaurant.find().select('title photo rating');
    res.status(200);
    res.json(restaurants);
}

export async function getRestaurantById(req: RequestWithValidated, res: Response) {
    const restaurant = await Restaurant.findById(req.validated.params.id);

    if (!restaurant) {
        throw new NotFoundError('Restaurant not found');
    }

    const comments = await Comment
        .find({ restaurant: restaurant.get('_id') })
        .select('owner text star visitDate');

    res.status(200);
    res.json({
        ...restaurant.toJSON(),
        comments,
    });
}

export async function commentRestaurant(req: RequestWithValidated, res: Response) {
    const user: UserDocument = req.user;
    const exists = await Restaurant.countDocuments({ _id: req.validated.params.id});

    if (!exists) {
        throw new NotFoundError('Restaurant not found');
    }

    const comment = new Comment(req.validated.body);
    comment.owner = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
    };
    comment.restaurant = req.validated.params.id;
    await comment.save()

    kafka.getProducer().send([{
        topic: 'data-controller',
        messages: JSON.stringify({
            restaurantId: comment.restaurant,
            star: comment.star,
        })
    }], (err: Error) => {
        if (err) {
            console.log('Failed to send kafka message', err.message);
        } else {
            console.log('Kafka message sent.')
        }
    });

    res.status(201);
    res.json(comment);
}
