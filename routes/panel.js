var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get('/', function (req, res, next) {
        nick = req.session.nick;
        res.render('dashboard', {
                username: nick
        });
});

module.exports = router;