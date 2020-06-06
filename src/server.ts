import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as dotenv from 'dotenv';
dotenv.config();
import { config } from 'node-config-ts';

const {
  server: { port: expressPort },
} = config;

import { getDatabase } from './database';
import userRoutes from './routes/user';
import authenticateRoutes from './routes/authenticate';
// import { User } from './database/models';
import { get404 } from './controller/error';

const app = express();
app.use(bodyParser({ extended: false }));

// here is how you can get your database reference
getDatabase()
  .then(async _db => {
    app.use('/users', userRoutes);
    app.use('/authenticate', authenticateRoutes);

    app.get('/', (req, res) => {
      res.send(`Hello World on port ${expressPort}`);
    });

    app.use(get404);

    app.listen(expressPort, () => {
      console.log(`Server is running in http://localhost:${expressPort}`);
    });

    // lets find a user
    // const user = await User.findOne();
    // if (!user) {
    //   console.log('Sorry, could not find any user...');
    //   return;
    // }
    // const { displayName, language } = user;
    // console.log('User', displayName, 'found. User speaks', language);
  })
  .catch(error => {
    console.log('Server app error: ', error);
  });
