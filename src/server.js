const util = require('apex-util');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const port = process.env.PORT || 3000;

app.use('/', require('./routes')(express));

exports.server = app.listen(port, () => {
  util.log('Server Active On Port', port);
});
