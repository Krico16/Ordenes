var express = require('express');
var router = express.Router();
var user = require('../models/user');

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
  if(nick && mail && pass && pass == confirm){

    var userData = {
      email: mail,
      username : nick,
      password : pass
    }
    user.create( userData, ( err, user) => {
      if( err ){
        console.log(err);
        return next(err);
      }else{
        console.log(user);
        return res.redirect('/');        
      }
    });
  }
});

module.exports = router;