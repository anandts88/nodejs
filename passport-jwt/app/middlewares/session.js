import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from './../config';
import User from './../models/user';

const {
  jwt: { secret, expiresIn, header }
} = config;

export function authenticate(req, res, next) {
  const passportAuthenticate = passport
    .authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res
          .status(401)
          .json({ err: info });
      }

      req
        .logIn(user, (err) => {
          let token;
          let session;

          if (err) {
            return res
              .status(500)
              .json({ err: 'Error while processing login request.' });
          }

          token = jwt.sign(user, secret, { expiresIn });

          session = req.session;

          // Save token in session
          session[header] = token;
          session.user = user.toObject();

          // Set token in header
          res.setHeader(header, token);

          res
            .status(200)
            .json({ session: session.user });
        });
    });

    passportAuthenticate(req, res, next);
}

export function verify(req, res, next) {
  const token = req.headers[header];
  const tokenInSession = req.session[header];
  let _err;

  if (token) {
    if (token === tokenInSession) {
      jwt.verify(token, secret, (err, decoded) => { // eslint-disable-line no-unused-vars
        if (err) {
          _err = new Error('You are not authenticated!');
          _err.status = 401;

          return next(_err);
        }

        next();
      });
    } else {
      _err = new Error('You are not authenticated!');
      _err.status = 401;

      return next(_err);
    }
  } else {
    // if there is no token
    // return an error
    _err = new Error('No token provided!');
    _err.status = 403;

    return next(_err);
  }
}

export function logout(req, res, next) { // eslint-disable-line no-unused-vars
  req.logout();
  req.session.destroy();
  res
    .status(204)
    .end();
}

export function enroll(req, res, next) { // eslint-disable-line no-unused-vars
  const { username, password } = req.body;

  User.register(new User({ username }), password, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ err });
    }

    passport
      .authenticate('local')(req, res, () => {
        return res
          .status(200)
          .json({ session: user });
      });

  });
}

export function currentUser(req, res, next) { // eslint-disable-line no-unused-vars
  return res
    .status(200)
    .json({ session: req.session.user });
}
