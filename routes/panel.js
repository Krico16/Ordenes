var express = require('express');
var router = express.Router();
var projects = require('../models/proyecto').Project;
var asinc = require('async');

router.get('/', function (req, res, next) {
        if (req.session.data) {
                var nick = req.session.data.nick;
                var id = req.session.data.UserID;
                var mail = req.session.data.email;
                var ConteoProjects = projects.countDocuments();
                var Lista = {
                        ProjectCount: ConteoProjects.exec.bind(ConteoProjects)
                };
                asinc.parallel(Lista, (ex, rs) => {
                        if (ex) {
                                res.status(500).send(ex);
                                return;
                        }
                        res.render('dashboard', {
                                username: nick,
                                userid: id,
                                email: mail,
                                data: rs
                        });
                });
        } else {
                res.redirect('/');
        }
});

module.exports = router;