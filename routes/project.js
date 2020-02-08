var express = require('express');
var router = express.Router();
var sync = require('async');

var Project = require('../models/proyecto');

router.get('/', function (req, res, next) {
    if (req.session.userID) {
        var nick = req.session.nick;
        var id = req.session.userID;
        var ListaProyectos = Project.find();
        var Info = {
            projects: ListaProyectos.exec.bind(ListaProyectos)
        };

        sync.parallel(Info, (ERR, success) => {
            if (ERR) {
                res.status(500).send(ERR);
                return;
            }
            res.render('projects', {
                username: nick,
                uid: id,
                data: success
            });
        });
    } else {
        res.redirect('/');
    }
});


router.get('/new', function (req, res, next) {
    if (req.session.nick) {
        var nick = req.session.nick;
        var id = req.session.userID;
        var mail = req.session.email;

        res.render('newProject', {
            username: nick,
            userid: id,
            email: mail
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;