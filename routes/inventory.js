var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var pl = require('async');
var inventario = require('../models/inventory').Inventario;
var insumos = require('../models/inventory').Insumo;
var repuestos = require('../models/inventory').Repuesto;
var equipo = require('../models/inventory').Equipo;


router.get('/', (req, res, next) => {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;
        var Items = inventario.find();

        var infoData = { items: Items.exec.bind(Items) };

        pl.parallel(infoData, (ex, done) => {
            if (ex) {
                res.status(500).send(ex)
            } else {
                res.render('inventory', {
                    username: nick,
                    userid: id,
                    email: mail,
                    data: done
                });
            }
        })
    }
});

router.post('/Insumos', (req, res, next) => {
    var item = req.body.item;
    var cant = req.body.qnt;
    var prc = req.body.price
    var Registro = new insumos({
        Item: item,
        Stored: cant
    });

    inventario.findOneAndUpdate({
        _id: new ObjectId("5e505f7c4f4614b7533888bd")
    }, {
        $push: {
            Insumos: Registro
        }
    }, (err) => {
        if (err) {
            res.json({
                result: 'Error',
                msg: err
            })
        } else {
            inventario.find({}, {
                "Insumos": "$Insumos"
            }, (exc, done) => {
                if (exc) {
                    res.json({
                        result: 'Error',
                        msg: exc
                    });
                } else {
                    res.json({
                        result: 'Done',
                        data: done
                    });
                }
            });
        }
    });
});

router.post('/Repuesto', (req, res, next) => {
    var item = req.body.item;
    var cant = req.body.qnt;
    var Registro = new insumos({
        Item: item,
        Cost: cant
    });

    inventario.findOneAndUpdate({
        _id: new ObjectId("5e5046ff75de0a34243a29c0")
    }, {
        $push: {
            Insumos: Registro
        }
    }, (err) => {
        if (err) {
            res.json({
                result: 'Error',
                msg: err
            })
        } else {
            res.json({
                result: 'Done'
            });
        }
    });


});

router.post('/Equipo', (req, res, next) => {
    var item = req.body.item;
    var cant = req.body.qnt;
    var Registro = new insumos({
        Item: item,
        Cost: cant
    });

    inventario.findOneAndUpdate({
        _id: new ObjectId("5e5046ff75de0a34243a29c0")
    }, {
        $push: {
            Insumos: Registro
        }
    }, (err) => {
        if (err) {
            res.json({
                result: 'Error',
                msg: err
            })
        } else {
            res.json({
                result: 'Done'
            });
        }
    });


});

module.exports = router;

/**
Lista ubicaciones : filtro por proyecto
------- Lista de equipos: filtro por proyecto

------- Lista de fallas:
------- Orden: 
------- 	Equipo afectado
------- 	Tipo de falla
------- 	Descripcion

------- Lista de tecnicos
------- Agregar reinicio de password
 */
