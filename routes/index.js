var express = require('express');
var router = express.Router();
var bcypt = require('bcryptjs');
var userModel = require('../models/user');
var session  = require('express-session');

var sessionData;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Ordenes'
  });
});

router.post('/', function (req, res, next) {
  var user = req.body.UserMail;
  var pass = req.body.UserPass;

  userModel.findOne({'email':user}, (err, resp) => {
    if(err) {
      console.log(err);
      res.redirect('/');
    }else{
      bcypt.compare(pass, resp.password, (error, succ) => {
        if(succ){
          sessionData = req.session;
          sessionData.userID = resp._id;
          sessionData.nick = resp.username;
          sessionData.email = resp.email;
          res.redirect('/dashboard');
        }else{
          res.redirect('/');
        }
      })
    }
  })
});

module.exports = router;