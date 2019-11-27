const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/reactive', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.once('open', (error) => {
        if (error) {
            console.log(error);
        }

        console.log('MongoDB ready!')
    });

    db.on('error', (reason) => {
        console.log(reason)
    });
}