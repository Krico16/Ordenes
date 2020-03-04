var express = require('express');
var router = express.Router();
var paralel = require('async');
var moment = require('moment');
var ordenModel = require('../models/ordenes').OrderModel;

router.get('/', function (req, res, next) {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;

        

        res.render('order/inicio',{
            username: nick,
            userid: id,
            email: mail
        })
    } else {
        res.redirect('/');
    }
});

router.get('/new', function (req, res, next) {
})

router.post('/new', function (req, res, next) {
});

module.exports = router;