# passport-jwt

Authentication using Passport and JWT.

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

1. Token header `passport-jwt-header`
2. Session identifier `passport-jwt-session-id`

## /session:POST

### Request Params

1. username
2. password

### Response

Returns user information after successful login along with JWT token under header `passport-jwt-header`.


## /session:DELETE

Perform logout

Send request header `passport-jwt-header` with value received from `/session:POST`


## /session:GET

Get current user information.

Send request header `passport-jwt-header` with value received from `/session:POST`
