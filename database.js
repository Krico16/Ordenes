const mongoose = require('mongoose');

const uri = 'mongodb+srv://Server:WvnGX4qdoDlA0LKj@ordenes-cs6r1.mongodb.net/test?retryWrites=true&w=majority';

const IniDB = function() {
    try {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to db");
    } catch (e) {
        console.log("Failed to connect");
        throw e;
    }
}

module.exports = IniDB;