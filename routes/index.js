var express = require('express');
var router = express.Router();
var uid = require('uuid');
var admin = require('../firebase');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Ordenes'
  });
});

router.post('/', function (req, res, next) {
  var uuid = uid.v1();
  admin.auth().createCustomToken(uuid)
    .then(function (customToken) {
      // Send token back to client
      res.redirect('/dashboard');
      console.log(customToken);
    })
    .catch(function (error) {
      console.log('Error creating custom token:', error);
    });
});

module.exports = router;