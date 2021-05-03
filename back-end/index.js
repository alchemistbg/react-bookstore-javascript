const express = require('express');
const bodyParser = require('body-parser');
const port = 5001;
const app = express();

require('./config/database')();

const genresRouter = require('./api/genres');
const booksRouter = require('./api/books');
const usersRouter = require('./api/users');
const ordersRouter = require('./api/orders');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/genres', genresRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);

app.use((error, req, res, next) => {
    // console.log(error);
    const status = error.status || 500;
    const { message, info } = error;
    res.status(status).json({ message, info });
    next();
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});