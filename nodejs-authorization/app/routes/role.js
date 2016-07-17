import express from 'express';
import { add } from './../middlewares/role';

const router = express.Router();

router
  .route('/')
  .post(add);

export default router;
