import express from 'express';
import constants from './../utils/constants';
import { add, getById } from './../middlewares/user';
import { verify } from './../middlewares/session';
import { can } from './../middlewares/role';

const { ROLES: { ADMIN } } = constants;

const router = express.Router();

router
  .route('/')
  .post(add);

router
  .route('/:id')
  .get(verify, can(ADMIN), getById);

export default router;
