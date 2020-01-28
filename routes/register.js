var express = require('express');
var router = express.Router();
var firebase = require('firebase');
require('firebase/auth');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('reg', {
    title: 'Ordenes'
  });
});

router.post('/', function (req, res, next) {
  var email = req.body.UserEmail;
  var pass = req.body.UserPassword;
  var confirm = req.body.ClonePassword;

  if (email != null && pass != null && confirm != null) {
    if (pass === confirm) {
      firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then( success => {
        res.redirect('/');
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        res.redirect('/');
        // ...
      });
    }
  }
});
module.exports = router;