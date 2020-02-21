var express = require('express');
var router = express.Router();
var insumos = require('../models/inventory').Insumo;
var inventario = require('../models/inventory').Inventario;

router.get('/', (req, res, next) => {
    if(req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.userID;
        var mail = req.session.data.email;

        res.render('inventory', {
            username: nick,
            userid: id,
            email: mail
        })
    }
});

router.post('/', (req, res ,next) => {
    var item = req.body.item;
    var cant = req.body.qnt;
    var Elemento = {
        Item: item,
        Cost: cant
    };
    const Registro = new insumos(Elemento);
    Registro.save((exc) => {
        if(exc) res.json({result: 'Error'});
        res.json({result: 'Done'})
    })

});

module.exports = router;

/**
 * 
 *
 Lista ubicaciones : filtro por proyecto
Lista de equipos: filtro por proyecto

Lista de fallas:
Orden: 
	Equipo afectado
	Tipo de falla
	Descripcion
	
Lista de tecnicos
Agregar reinicio de password
 */