import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import chalk from 'chalk';

// All the routes
import routes from './routes';

// PassportJS setup
import './handlers/passport';

// Database stuff
import { sql } from './db';

import User from './models/User';
import Link from './models/Link';
import Tag from './models/Tag';

import { jwt } from './controllers/authCtrl';

sql.sync();

// Initialize App
const app = express();

// CORS setup
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'https://bkmrk.space',
];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || typeof origin === 'undefined') {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Bodyparser for REST and all that good stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Middleware
app.use(passport.initialize());
app.use(jwt);

// After middleware madness, all our routes!
app.use('/', routes);

// Start server
app.set('port', process.env.BKMRK_BACKEND_PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(chalk.blue(`🚂 Backend running → PORT ${server.address().port}`));
});
