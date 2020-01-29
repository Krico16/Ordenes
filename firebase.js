var admin = require('firebase-admin');
var fbConfig = require('./sdk.json');

module.exports = admin.initializeApp({
    credential: admin.credential.cert(fbConfig),
    databaseURL: 'https://prueba-2e62f.firebaseio.com'
  });
  