const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;


app.use('/node_modules/xterm/css/', express.static('node_modules/xterm/css'));

app.use('/node_modules/xterm/lib/', express.static('node_modules/xterm/lib'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);

