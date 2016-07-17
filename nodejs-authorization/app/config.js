export default {
  jwt: {
    secret: 'node-authorization-secret-key',
    expiresIn: 3600,
    header: 'node-authorization-header'
  },

  session: {
    secret: 'node-authorization-secret-key',
    id: 'node-authorization-session-id',
    timeout: 3 * 60 * 60 * 1000
  },

  database: {
    url: 'mongodb://localhost:27017/node-authorization',
    timeout: 2 * 60 * 1000,
    poolSize: 10
  }
};
