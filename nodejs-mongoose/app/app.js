import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import dbConnection from './database';
import config from './config';
import routes from './routes/index';
import users from './routes/users';

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
app.use(express.static(path.join(__dirname, 'public')));

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

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const { status, message } = err;

    res.status(status || 500);
    res.json({
      message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status, message } = err;

  res.status(status || 500);
  res.json({
    message,
    error: {}
  });
});


export default app;
