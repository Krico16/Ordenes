var express = require('express');
var router = express.Router();

var cont = 0;
var conectados = {};

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (req.session.data) {
        var nick = req.session.data.nick;
        var id = req.session.data.UserID;
        var mail = req.session.data.email;

        res.render('Message', {
            username: nick,
            userid: id,
            email: mail
        });
    } else {
        res.redirect('/');
    }
});

module.exports = function(io){

    io.on('connection', (socket) => {
        socket.on('register', (username) => {
            socket.username = username;
            conectados[username] = socket.id;
        });
        socket.on('message', (data) => {
            var id = data.id;
            var txt = data.body;
            socket.broadcast.emit('msgs', {to: id, m: txt});
        });
        cont++;
        socket.on('disconnect', function(){
            var id = socket.id;
            delete conectados.id;
            cont--;
            io.emit('online', {conectados: cont, lista: conectados});
        })
        io.emit('online', {conectados: cont, lista: conectados});
    })
    return router;
};