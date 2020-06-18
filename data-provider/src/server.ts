import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import { Message } from 'kafka-node';
dotenv.config();
import config from 'config';

import * as kafka from './services/kafka';
import { Restaurant } from './models/restaurant';
kafka.connectConsumer('data-provider');

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
    const { rating, restaurantId } = JSON.parse(message.value.toString());
    await Restaurant.updateOne({ _id: restaurantId }, { $set: { rating } });
});





