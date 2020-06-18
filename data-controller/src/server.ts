import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import { Message } from 'kafka-node';
dotenv.config();
import config from 'config';

import * as kafka from './services/kafka';
import { Star } from './models/star';
kafka.connectConsumer('data-controller');
kafka.connectProducer();

// Connect to MongoDB
mongoose.Promise = bluebird;

mongoose.connect(config.get('db.uri'), { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } )
    .then(() => {
        console.log('Connected to DB.');
    })
    .catch((err: Error) => {
        console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    });


kafka.getConsumer().on('message', async (message: Message) => {
    console.log('Processing message');
    const value = JSON.parse(message.value.toString());
    await Star.create(value);

    const results = await Star.aggregate([
        { $match: { restaurantId: value.restaurantId } },
        { $group: { _id: value.restaurantId, rating: { $avg: '$star'}}}
    ]);

    if (!results.length) {
        return;
    }

    kafka.getProducer().send([{
        topic: 'data-provider',
        messages: JSON.stringify({
            restaurantId: value.restaurantId,
            rating: results[0].rating
        })
    }], (err: Error) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Done');
        }
    });
});





