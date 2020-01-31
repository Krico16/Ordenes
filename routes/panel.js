var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get('/', function (req, res, next) {
        if (req.session.nick) {
                var nick = req.session.nick;
                var id = req.session.userID;
                res.render('dashboard', {
                        username: nick,
                        userid: id
                });
        }else {
                res.redirect('/');
        }
});

module.exports = router; 