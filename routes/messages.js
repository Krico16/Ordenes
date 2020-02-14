var express = require('express');
var router = express.Router();
var db = require('../firebase');
var fb = require('firebase-admin');


/* GET users listing. */
router.get('/', function (req, res, next) {
    var chat = db.collection('messages')
        .orderBy('time', 'desc')
        .limit(15);
    var lista = Array();
    chat.onSnapshot((val) => {
        val.docChanges().forEach((change) => {
            if (change.type === 'removed') {

            } else {
                var msg = change.doc.data();
                lista.push(msg);
            }
        })
        res.io.emit('messages',  lista);
        res.render('test');
    });


    //res.send('respond with a resource');
});

router.get('/a', function(req, res, net){
    res.io.emit('socketToMe', 'users');
    res.render('test');
});

router.post('/', function (req, res, next) {
    var nick = req.body.nick;
    var txt = req.body.message;

    db.collection('messages').add({
        name: nick,
        content: txt,
        time: fb.firestore.FieldValue.serverTimestamp()
    }).catch((err) => {
        console.log('Error enviando mensaje: ', err);
    });
    //res.io.emit('messages',{name: nick, content: txt});
    res.send('Mensaje enviado: ' + txt)

})

module.exports = router;

/*

module.exports = function(io){
    var app = require('express');
    var router = app.Router();

    io.on('connection', (socket) =>  {
        console.log('Usuario Conectado');
    })

    return router;
}

*/