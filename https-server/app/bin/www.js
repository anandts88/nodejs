/**
 * Module dependencies.
 */

import app from '../app';
import _debug from 'debug';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

const debug = _debug('node-es6:server');

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);
app.set('secPort', port + 443);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function() {
  debug(`Server started on port ${port}`);
});

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind}  requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind}  is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`;

  debug(`Listening on ${bind}`);
};

server.on('error', onError);
server.on('listening', onListening);

/**
 * Create HTTPS server.
 */
const options = {
  key: fs.readFileSync(path.join(__dirname, 'private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certificate.pem'))
};

const secureServer = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */

secureServer.listen(app.get('secPort'), () => {
   console.log('Server listening on port ', app.get('secPort'));
});

secureServer.on('error', onError);
secureServer.on('listening', onListening);
