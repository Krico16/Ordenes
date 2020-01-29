var express = require('express');
var router = express.Router();
var admin = require('../firebase');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('reg', {
    title: 'Ordenes'
  });
});

router.post('/', function (req, res, next) {
  var nick  = req.body.UserName;
  var mail = req.body.UserEmail;
  var pass = req.body.UserPassword;
  var confirm = req.body.ClonePassword;

  if (mail && pass && confirm && nick) {
    if (pass === confirm) {
      admin.auth().createUser({
        email: mail,
        password: pass,
        emailVerified: true,
        displayName: nick,
        disabled: false
      }).then( record => {
          console.log(record.uid);
          res.redirect('/');
      }).catch( error => {
        console.log("Error: ", error);
        res.render(error);
      } );
    }
  }
});
module.exports = router;