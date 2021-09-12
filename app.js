const path = require('path');

const express = require('express');

const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const app = express();

app.use(helmet());
app.use(cookieParser(process.env.CP_SECRET));
app.use(express.json());

const db = require('./config/database');
db.connect();

const genresRouter = require('./api/genres');
const booksRouter = require('./api/books');
const usersRouter = require('./api/users');
const ordersRouter = require('./api/orders');
const commentsRouter = require('./api/comments');
const cartsRouter = require('./api/carts');
const { RSA_NO_PADDING } = require('constants');

app.use((req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5002');
    } else if (process.env.NODE_ENV === "production") {
        res.setHeader('Access-Control-Allow-Origin', `https://mern-bookstore.herokuapp.com`);
    }
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader("Content-Security-Policy", "script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    // res.setHeader("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    next();
});

app.use('/api/genres', genresRouter);
// app.use('./api/books/:id/comments', commentsRouter);
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/carts', cartsRouter);

app.use((error, req, res, next) => {
    // console.log(error);
    const status = error.status || 500;
    const { message, info } = error;
    res.status(status).json({ message, info });
    next();
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res
            .sendFile(path.join(__dirname, '/client/build/index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.status(200).send('API running');
    });
}



module.exports = app;