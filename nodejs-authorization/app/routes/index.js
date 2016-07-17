import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  res.json({ status: 'Success' });
});

export default router;
