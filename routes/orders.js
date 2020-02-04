var express = require('express');
var router = express.Router();
var ordenModel = require('../models/ordenes');

router.get('/', function (req, res, next) {
    if (req.session.nick) {
        var nick = req.session.nick;
        var id = req.session.userID;
        ordenModel.find({}, (err, docs) => {
            if (err) {
                console.log("Error obteniendo datos: ", err);
                res.redirect('/dashboard');
            }
            console.log(docs);
            res.render('orderList', {
                username: nick,
                userid: id,
                ordenes: docs
            });
        })
    } else {
        res.redirect('/');
    }
});

router.get('/new', function (req, res, next) {
    if (req.session.nick) {
        var nick = req.session.nick;
        var id = req.session.userID;
        res.render('orderNew', {
            username: nick,
            userid: id
        });
    } else {
        res.redirect('/');
    }
})

router.post('/new', function (req, res, next) {
    if (req.body.nombre && req.body.price && req.body.dir) {
        var projectName  = req.body.nombre;
        var projectPrice = req.body.price;
        var projectDir   = req.body.dir;
        var projectVals  = [1923, 1111, 1993.4]; 

        var Orden = {
            nombre: projectName,
            precio: projectPrice,
            valores: projectVals,
            direccion: projectDir
        };
        var newOrder = ordenModel(Orden);

        newOrder.save( err => {
            if(err){
                console.log(err);
                res.redirect('/dashboard');
            }else{
                console.log('Orden creeada');
                res.redirect('/ordenes');
            }
        });
    } else {
        console.log('Error');
    }
});

module.exports = router;