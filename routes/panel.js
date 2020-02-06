var express = require('express');
var router = express.Router();
var session = require('express-session');
var ordenes = require('../models/ordenes');
var asinc = require('async');

router.get('/', function (req, res, next) {
        if (req.session.nick) {
                var nick = req.session.nick;
                var id = req.session.userID;
                var ConteoOrdenes = ordenes.countDocuments();
                var Lista = {
                        OrderCont: ConteoOrdenes.exec.bind(ConteoOrdenes)
                };
                asinc.parallel(Lista, (ex, rs) => {
                        if (ex) {
                                res.status(500).send(ex);
                                return;
                        }
                        res.render('dashboard', {
                                username: nick,
                                userid: id,
                                data: rs
                        });
                });
        } else {
                res.redirect('/');
        }
});

module.exports = router;