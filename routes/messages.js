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

router.post('/', function (req, res, next) {
    //var sender = req.session.data.nick;
    var recepter = req.body.dest;
    var txt = req.body.message;
    var s = req.body.nick

    res.io.emit('ms', {conectados: cont});
    res.json({
        msg: 'success'
    })
})


module.exports = function(io){

    io.on('connection', (socket) => {
        socket.on('register', (username) => {
            console.log(username);
            
            socket.username = username;
            conectados[username] = socket.id;
        });
        cont++;
        socket.on('disconnect', function(){
            var id = socket.id;
            delete conectados.id;
            cont--;
            io.emit('online', {conectados: cont, lista: conectados});
        })
        console.log(conectados);
        io.emit('online', {conectados: cont, lista: conectados});
    })
    return router;
};