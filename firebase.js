var admin = require('firebase-admin');

var service = require('./fbSDK.json');

admin.initializeApp({
    credential: admin.credential.cert(service),
    databaseURL: 'https://nordenes.firebaseio.com',
    storageBucket: 'nordenes.appspot.com'
});

var database = admin.firestore();
var storage = admin.storage().bucket();

module.exports = {database, storage};