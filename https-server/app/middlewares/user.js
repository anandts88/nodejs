import Promise from 'bluebird';
import User from './../models/user';
import Role from './../models/role';

export function add(req, res, next) {
  const {
    user: {
      username,
      password,
      role
    }
  } = req.body;

  Role
    .findById(role)
    .then((_role) => {
      if (!_role) {
        throw new Error('Role is not valid.');
      }

      return _role;
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        User.register(new User({ username, role }), password, (err, user) => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        });
      });
    })
    .then((user) => {
      return res
        .status(200)
        .json({ user });
    })
    .catch((err) => next(err));
}

export function getById(req, res, next) {
  const { id } = req.params;

  User
    .findById(id)
    .then((user) => {
      if (user) {
        return res.json({ user });
      }

      throw new Error('Id is not valid.');
    })
    .catch((err) => next(err));
}
