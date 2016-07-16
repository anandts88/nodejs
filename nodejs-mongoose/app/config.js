export default {
  session: {
    secret: 'nodejs-mongoose-secret-key',
    id: 'nodejs-mongoose-session-id',
    timeout: 3 * 60 * 60 * 1000
  },

  database: {
    url: 'mongodb://localhost:27017/nodejs-mongoose',
    timeout: 2 * 60 * 1000,
    poolSize: 10
  }
};
