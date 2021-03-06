var express = require('express');
var router = express.Router();
var paralel = require('async');
var moment = require('moment');

var ordenModel = require('../models/ordenes').OrderModel;
var Project = require('../models/proyecto').Project;

router.get('/', function (req, res, next) {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;

        var projectList = Project.find();
        var arr = {
            projectos: projectList.exec.bind(projectList)
        }

        paralel.parallel(arr, (bad, succ) => {
            if (!bad) {
                res.render('orders/inicio', {
                    username: nick,
                    userid: id,
                    email: mail,
                    data: succ
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

router.post('/new/:tipo', function (req, res, next) {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;

        var tipo = req.params.tipo;
        res.render('orders/correctivo', {
            username: nick,
            userid: id,
            email: mail,
            data : JSON.stringify(req.body)
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;