import config from 'config';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import bluebird from 'bluebird';

// Routes (routes handlers)
import authRouter from './routes/auth';

import BaseError from './libs/errors/base-error';


// Passport configuration
import * as passportConfig from './services/passport';
passportConfig.configure();

// Create Express server
const app = express();

// Connect to MongoDB
mongoose.Promise = bluebird;

mongoose.connect(config.get('db.uri'), { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } )
    .then(() => {
        console.log('Connected to DB.');
    })
    .catch((err: Error) => {
        console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    });

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/', (req: Request, res: Response) => {
    res.end('connected');
});


// API routes.
app.use('/api/auth', authRouter);


//  Error handler
app.use((err: BaseError, req: Request, res: Response, next: NextFunction) => {
    const errorObject = {
        message: err.message,
        status: err.statusCode || 500,
        errors: err.errors
    }
    res.status(errorObject.status);
    res.send(errorObject);
});

export default app;
