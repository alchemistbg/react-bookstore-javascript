const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();



app.listen(port, () => {
    console.log('App listening on port 3000!');
});