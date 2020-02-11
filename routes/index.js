var express = require('express');
var router = express.Router();
var bcypt = require('bcryptjs');
var userModel = require('../models/user');
require('express-session');

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
          var UserData = {
            UserID : resp._id,
            nick: resp.username,
            email: resp.email
          }
          req.session.data = UserData;
          req.session.save();
          console.log(req.session.data);
          res.redirect('/dashboard');
        }else{
          res.redirect('/');
        }
      })
    }
  })
});

module.exports = router;