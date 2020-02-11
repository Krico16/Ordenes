var express = require('express');
var router = express.Router();
var sync = require('async');

var Project = require('../models/proyecto');

router.get('/', function (req, res, next) {
    if (req.session.userID) {
        var nick = req.session.nick;
        var id = req.session.userID;
        var mail = req.session.email;
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

router.post('/create', function (req, res, next) {

    var ProjectData = {
        Nombre: req.body.project,
        Cliente: req.body.client,
        Equipos: req.body.quantity,
        Preventivos: {
            Cantidad: req.body.quantityPreventive ,
            HorasxPreventivo: convertToMinutes(req.body.PreventiveHour) ,
            HorasxPreventivoAnual: convertToMinutes(req.body.AnualPreventiveHour) ,
            HorasPerdidas: convertToMinutes(req.body.LostPreventive) ,
            HorasxCambio: convertToMinutes(req.body.ChangePreventive)
        },
        Correctivos: {
            Cantidad: req.body.quantityCorrect ,
            HorasxCorrectivo : convertToMinutes(req.body.CorrectiveHour) ,
            HorasxRepuesto: convertToMinutes(req.body.LostCorrective) ,
            HorasPerdidas: convertToMinutes(req.body.ChangeCorrective)
        }
    };

    var nProject = Project(ProjectData);

    nProject.save(err => {
        if(err){
            console.log("Error creando proyecto",err);
            res.redirect('/projects');
        }
        console.log("Proyecto creado");
        res.redirect('/projects');
    });
});

function convertToMinutes(Hora){
    var parte = Hora.split(':');

    var total = Number( +parte[0] * 60) + Number(parte[1]);

    return total;
}

module.exports = router;