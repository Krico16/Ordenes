var express = require('express');
var router = express.Router();
var fb = require('../firebase');

router.get('/', function(req, res, next){
    var user = fb.auth().verifyIdToken;

    if(user){
        res.render('dashboard',{usuario : user});
        console.log(user);
        
    }else{
        res.redirect('/');
    }
});

module.exports = router;
