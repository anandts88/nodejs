import Promise from 'bluebird';
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import config from './config';
import winston from './winston';

const {
  database: { url, timeout, poolSize }
} = config;

// promisify mongoose
Promise.promisifyAll(mongoose);
mongoose.Promise = Promise;

// connect to mongo db
const connection = mongoose.createConnection(url, {
  server: {
    socketOptions: {
      keepAlive: timeout,
      connectTimeoutMS: timeout
    },

    replset: {
      keepAlive: timeout,
      connectTimeoutMS: timeout
    }
  },
  poolSize
});

connection.on('error', () => {
  winston.error('Problem creating connection to database.');
  throw new Error(`Not able to connect to database: ${db}`);
});

connection.once('open', function() {
  winston.info('Database connection established!');
});

const gracefulExit = () => {
  connection.close(() => {
    winston.info('Closing database connection.');
    process.exit(0);
  });
};

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

autoIncrement.initialize(connection);

export default connection;
