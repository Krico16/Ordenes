var express = require('express');
var router = express.Router();
var sync = require('async');
var ObjectID = require('mongoose').Types.ObjectId;

var Project = require('../models/proyecto').Project;
var Insume = require('../models/proyecto').modelInsumo;

router.get('/', function (req, res, next) {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;
        var ListaProyectos = Project.find();
        var ConteoPersonal = Project.aggregate()
            .project({
                "personalSize": {
                    "$size": "$Personal"
                }
            });
        var Info = {
            projects: ListaProyectos.exec.bind(ListaProyectos),
            Conteo: ConteoPersonal.exec.bind(ConteoPersonal)
        };

        sync.parallel(Info, (ERR, success) => {
            if (ERR) {
                res.status(500).send(ERR);
                return;
            }

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
    } else {
        res.redirect('/');
    }
});

router.get('/repuestos/:projectID', (req, res, next) => {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;

        var idProject = new ObjectID(req.params.projectID);
        var ProjectData = Project.findOne({
            _id: idProject
        });

        var Info = {
            proyecto: ProjectData.exec.bind(ProjectData)
        };

        sync.parallel(Info, (err, done) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.render('repuestos', {
                    username: nick,
                    userid: id,
                    email: mail,
                    data: done
                })
            }
        });
    } else {
        res.redirect('/');
    }
});

router.get('/insumos/:projectID', (req, res, next) => {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;

        var idProject = new ObjectID(req.params.projectID);
        var ProjectData = Project.findOne({
            _id: idProject
        });

        var data = {
            proyecto: ProjectData.exec.bind(ProjectData)
        };

        sync.parallel(data, (exc, done) => {
            if (exc) res.status(500).send(exc);

            res.render('insumos', {
                username: nick,
                userid: id,
                email: mail,
                data: done
            });
        });
    } else {
        res.redirect('/');
    }
});

router.get('/info/:projectID', (req, res, next) => {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;

        var idProject = new ObjectID(req.params.projectID);
        var ProjectData = Project.findOne({_id : idProject});

        var data = { proyecto : ProjectData.exec.bind(ProjectData) };

        sync.parallel(data, (exc, done) => {
            if(!exc){
                res.json(done); // REEMPLAZAR CON VISTA DE POYECTO GENERAL
            }else{
                res.status(500).send(exc);
            }
        });
    }else{
        res.redirect('/dashboard',500);
    }
});

router.post('/insumos/:projectID', (req, res, next) => {
    var cuerpo = req.body;
    var idProject = req.params.projectID;
    var Lista = Array();
    for (const key in cuerpo) {
        const element = cuerpo[key];
        var nInsumo = new Insume();
        nInsumo.Descripcion = element[0];
        nInsumo.Cantidad = Number(element[1]);
        nInsumo.Medida = element[2];

        Lista.push(nInsumo);
    }
    Project.findByIdAndUpdate(ObjectID(idProject), {
        Insumos: Lista
    }, (exc) => {
        if (exc) console.log('Error actualizando documento:', exc);
        res.send('Saved')
    });
})

router.post('/repuestos/:projectID', (req, res, next) => {
    var cuerpo = req.body;
    var info = Array();
    var idProject = req.params.projectID;
    for (const key in cuerpo) {
        const element = cuerpo[key];
        var obj = String(element[0]);
        var cant = Number(element[1])
        var und = String(element[2])
        info.push({
            Elemento: obj,
            Cantidad: cant,
            Medida: und
        });
    }
    Project.findByIdAndUpdate(ObjectID(idProject), {
        Repuestos: info
    }, (exc) => {
        if (exc) console.log('Error actualizando documento:', exc);
        res.send('Saved')
    });
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
            Costo: (Number(element[1])).toFixed(2),
            Utilidad: (Number(element[1]) * 0.5).toFixed(2),
            Valor: (Number(element[1]) * 1.5).toFixed(2)
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
        res.redirect('/projects/continue/' + doc._id);
    });
});



function convertToMinutes(Hora) {
    var parte = Hora.split(':');

    var total = Number(+parte[0] * 60) + Number(parte[1]);

    return total;
}

module.exports = router;