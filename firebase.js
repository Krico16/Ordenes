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
/**
    var file = __basedir + '/archivos/mal.txt';
    firebase.storage.upload(file, {destination: 'uploads/text' }).then(data => {
        console.log('Archivo subido: ');
        res.json(data)
    }).catch(exc => {
        console.log('Error subiendo archivo: ', exc)
        res.status(500).send(exc);
    })
**/