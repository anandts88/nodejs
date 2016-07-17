# nodejs-mongoose

Node JS, express and ES6 - build using Gulp
Boiler plate application to develop REST API using Node JS, Express and ES6.

Installation
============

1. Atom Editor
2. Download and install node js from [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
3. Install node-inspector `npm install -g node-inspector`

Database setup
==============

1. Install mongodb from [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/).
2. Start mongodb using `mongod --dbpath <path-to-data-storage>`
3. Create data base using `use nodejs-mongoose`.
4. Connection will be established under `mongodb://localhost:27017/nodejs-mongoose`.

Set Up
======

1. Check out project.
2. Run `npm install`
3. Run `npm start`
4. Launch http://localhost:3000

Features
========

1. Implement code in `ES6` syntax.
2. Code quality using `ESLINT`.
3. Do changes in a file and server will automatically restart with help of `Nodemon`.
4. Debug the application during development time by launching http://127.0.0.1:8080/?port=5858.
5. Mongoose connections are promisified using `bluebird`.
6. Session management using `express-session` and `connect-mongo` (MongoStore)
