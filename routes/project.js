var express = require('express');
var router = express.Router();
var sync = require('async');
var ObjectID = require('mongoose').Types.ObjectId;

var Project = require('../models/proyecto');

router.get('/', function (req, res, next) {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;
        var ListaProyectos = Project.find();
        var ConteoPersonal = Project.aggregate([{
            "$project": {
                "count": {
                    "$reduce": {
                        "input": "$Personal",
                        "initialValue": 0
                    }
                }
            }
        }]);
        var Info = {
            projects: ListaProyectos.exec.bind(ListaProyectos),
            Conteo: ConteoPersonal.exec.bind(ConteoPersonal)
        };

        sync.parallel(Info, (ERR, success) => {
            if (ERR) {
                res.status(500).send(ERR);
                return;
            }
            console.log(success);

            res.render('projects', {
                username: nick,
                userid: id,
                email: mail,
                data: success
            });
        });
    } else {
        res.redirect('/');
    }
});


router.get('/new', function (req, res, next) {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;

        res.render('newProject', {
            username: nick,
            userid: id,
            email: mail
        });
    } else {
        res.redirect('/');
    }
});

router.get('/continue/:projectID', (req, res, next) => {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;

        var idProject = new ObjectID(req.params.projectID);
        var ProjectData = Project.findOne({
            _id: idProject
        });

        var List = {
            proyecto: ProjectData.exec.bind(ProjectData)
        }
        sync.parallel(List, (bad, good) => {
            if (bad) {
                res.status(500).send(bad);
                return;
            }
            res.render('addPersonal', {
                username: nick,
                userid: id,
                email: mail,
                data: good
            });
        });
    }
});

router.post('/continue/:projectID', (req, res, next) => {
    var _t = Array();
    var t__ = Array();
    var i = 0;
    var Personal = Array();
    for (const key in req.body) {
        var value = req.body[key];
        t__.push(value);
        if (i === 1) {
            _t.push(t__)
            t__ = [];
            i = -1;
        }
        i++;
    }
    _t.forEach(element => {
        var a = {
            Tipo: element[0],
            Costo: element[1]
        }
        Personal.push(a);
    });
    Project.findByIdAndUpdate(ObjectID(req.params.projectID), {
        Personal: Personal
    }, (err) => {
        if (err) console.log('Error actualizando documento:', err);
        res.send('Saved')
    });
});

router.post('/create', function (req, res, next) {

    var ProjectData = {
        Nombre: req.body.project,
        Cliente: req.body.client,
        Equipos: req.body.quantity,
        Preventivos: {
            Cantidad: req.body.quantityPreventive,
            HorasxPreventivo: convertToMinutes(req.body.PreventiveHour),
            HorasxPreventivoAnual: convertToMinutes(req.body.AnualPreventiveHour),
            HorasPerdidas: convertToMinutes(req.body.LostPreventive),
            HorasxCambio: convertToMinutes(req.body.ChangePreventive)
        },
        Correctivos: {
            Cantidad: req.body.quantityCorrect,
            HorasxCorrectivo: convertToMinutes(req.body.CorrectiveHour),
            HorasxRepuesto: convertToMinutes(req.body.LostCorrective),
            HorasPerdidas: convertToMinutes(req.body.ChangeCorrective)
        }
    };

    var nProject = Project(ProjectData);

    nProject.save((err, doc) => {
        if (err) {
            console.log("Error creando proyecto", err);
            res.redirect('/projects');
        }
        console.log("Proyecto creado: ", doc._id);
        res.redirect('/projects/edit/' + doc._id);
    });
});



function convertToMinutes(Hora) {
    var parte = Hora.split(':');

    var total = Number(+parte[0] * 60) + Number(parte[1]);

    return total;
}

module.exports = router;