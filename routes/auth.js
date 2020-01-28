var express = require('express');
var router = express.Router();
var firebase = require('firebase');

router.post('/', function(req, res, next){
    var email = req.body.UserMail;
    var password = req.body.UserPass;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        res.redirect('/');
        // ...
      });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
