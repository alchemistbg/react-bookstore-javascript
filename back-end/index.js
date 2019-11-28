const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

require('./config/database')();

const booksRouter = require('./routes/books');

app.use(bodyParser.json());

app.use('/routes/books', booksRouter);

app.listen(port, () => {
    console.log('App listening on port 3000!');
});