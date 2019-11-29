const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

require('./config/database')();

const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

app.use(bodyParser.json());

app.use('/routes/books', booksRouter);
app.use('/routes/users', usersRouter);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
    next();
})

app.listen(port, () => {
    console.log('App listening on port 3000!');
});