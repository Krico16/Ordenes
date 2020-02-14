var admin = require('firebase-admin');

var service = require('./fbSDK.json');

admin.initializeApp({
    credential: admin.credential.cert(service),
    databaseURL: 'https://nordenes.firebaseio.com'
});

var database = admin.firestore();

module.exports = database;