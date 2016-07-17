import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import dbConnection from './database';
import config from './config';

import routes from './routes/index';
import usersRoute from './routes/users';
import sessionRoute from './routes/session';
import roleRoute from './routes/role';

import UserModel from './models/user';

const app = express();
const MongoStore = connectMongo(session);
const {
  session: {
    secret,
    id: sessionId,
    timeout: sessionTimeout
  }
} = config;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Session config
app.use(session({
  secret,
	resave: false,
	saveUninitialized: false,
	name: sessionId,
	cookie: {
		// secure: true, // This works for https connections only.
		ephemeral: true, // Delete cookie when browser is closed.
		httpOnly: true, // Prevents browser javascript from accessing cookies.
		expires: new Date(Date.now() + sessionTimeout),
		maxAge: sessionTimeout
	},
	store: new MongoStore({ mongooseConnection: dbConnection })
}));

// passport config
app.use(passport.initialize());
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', usersRoute);
app.use('/session', sessionRoute);
app.use('/roles', roleRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// error handlers
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { status, message } = err;

  res
    .status(status || 500)
    .json({
      message,
      error: err
    });
});


export default app;
