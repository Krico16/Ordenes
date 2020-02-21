const mongoose = require('mongoose');

const uri = 'mongodb+srv://pruebas:ZpISw4fc1CNM9TXS@ordenes-cs6r1.mongodb.net/test?retryWrites=true&w=majority';

const IniDB = function() {
    try {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(()=> {
            console.log("Connected to db");
        }).catch( ex => {
            console.log("Failed to connect");
        });
    } catch (e) {
        console.log("Failed to connect");
        throw e;
    }
}

module.exports = IniDB;