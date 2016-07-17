export default {
  jwt: {
    secret: 'passport-jwt-secret-key',
    expiresIn: 3600,
    header: 'passport-jwt-header'
  },

  session: {
    secret: 'passport-jwt-secret-key',
    id: 'passport-jwt-session-id',
    timeout: 3 * 60 * 60 * 1000
  },

  database: {
    url: 'mongodb://localhost:27017/passport-jwt',
    timeout: 2 * 60 * 1000,
    poolSize: 10
  }
};
