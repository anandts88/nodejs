import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  res.send('respond with a resource');
});

export default router;
