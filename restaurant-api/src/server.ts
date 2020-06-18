import dotenv from 'dotenv';
dotenv.config();

import config from 'config';

import app from './app';

const server = app.listen(config.get('port'), () => {
    console.log(
        '  App is running at http://localhost:%d in %s mode',
        config.get('port'),
        config.get('env')
    );
    console.log('  Press CTRL-C to stop\n');
});

export default server;



