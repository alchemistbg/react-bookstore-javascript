const dotenv = require('dotenv').config({
    path: 'envs/.env_dev'
});

const express = require('express');

const helmet = require('helmet');
const port = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cookieParser(process.env.CP_SECRET));
app.use(express.json());

require('./config/database')();

const genresRouter = require('./api/genres');
const booksRouter = require('./api/books');
const usersRouter = require('./api/users');
const ordersRouter = require('./api/orders');
const commentsRouter = require('./api/comments');

// app.use(bodyParser.json());

// app.use(cors({
//     origin: 'http://localhost:5002',
//     credentials: true
// }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5002');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/genres', genresRouter);
// app.use('/api/books/:id/comments', commentsRouter);
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

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