import Role from './../models/role';
import lodash from 'lodash';

const { isString, isArray, indexOf, isNumber } = lodash;

export function add(req, res, next) {
  const {
    role: { name }
  } = req.body;

  Role
    .findOne({ name })
    .then((_role) => {
      let role;

      if (_role) {
        throw new Error('Role already exisits.');
      } else {
        role = new Role({ name });

        return role.save();
      }
    })
    .then((role) => {
      res
        .status(200)
        .json({ role })
    })
    .catch((err) => next(err));
}

export function can(roles) {
  return (req, res, next) => {
    const { role } = req.user;
    let err;

    if ((isNumber(roles) || isString(roles)) && roles === role) {
      next();
    } else if (isArray(roles) && indexOf(roles, role) > -1) {
      next();
    } else {
      err = new Error('Forbidden');
      err.status = 403;
      next(err);
    }
  };
}
