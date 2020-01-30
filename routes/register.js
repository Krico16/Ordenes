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
    var NewUser = user(userData);

    NewUser.save( err => {
      if(err){
        console.log(err);
        res.redirect('/');
      }else{
        console.log('Creado');
        res.redirect('/');
      }
    })
  }else{
    console.log('Dato erroneo');
    
  }
});

module.exports = router;