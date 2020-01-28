var express = require('express');
var router = express.Router();
var firebase = require('firebase');
require('firebase/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Ordenes'
  });
});

router.post('/', function (req, res, next) {
  var email = req.body.UserMail;
  var password = req.body.UserPass;
  if (email != null && password != null) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {
        res.redirect('/dashboard')
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        res.redirect('/');
        // ...
      });
  }else{
    res.redirect('/');
  }
});


module.exports = router;