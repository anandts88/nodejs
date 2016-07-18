# https-server

Authorization using node js.

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
5. Launch https://localhost:3443

Generate certificate
====================

Goto /app/bin and run the below commands to generate certificate.

```
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem

```
