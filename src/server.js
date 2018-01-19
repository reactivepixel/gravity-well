const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/', (req, res) => {
  res.json(req.body);
  console.log('\n\n\n============ Dumping Incoming Body ==============\n\n\n', req.body);
});

exports.server = app.listen(port, () => {
  console.log('Server Active On Port', port);
});
