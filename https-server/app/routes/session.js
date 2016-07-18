import express from 'express';
import { enroll, currentUser, authenticate, verify, logout } from './../middlewares/session';

const router = express.Router();

router
  .route('/')
  .post(authenticate)
  .get(verify, currentUser)
  .delete(verify, logout);

router
  .route('/enroll')
  .post(enroll);

export default router;
