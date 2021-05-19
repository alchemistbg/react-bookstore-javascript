const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
const Book = require('../models/Book');
const User = require('../models/User');

module.exports = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    const db = mongoose.connection;

    db.once('open', (error) => {
        if (error) {
            console.log(error);
        }

        console.log('MongoDB ready!');

        Book.seedBooks();
        User.seedUsers();

    });

    db.on('error', (reason) => {
        console.log(reason);
    });
}