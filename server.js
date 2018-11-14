const openfinLauncher = require('hadouken-js-adapter');
const path = require('path');
const express = require('express');
const http = require('http');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const configPath = path.resolve('./build/app.json');

const app = express();

app.use(express.static('./build'));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './build/index.html'));
});

http.createServer(app).listen(PORT, () => {
  console.log('Server created, starting OpenFin...');
  openfinLauncher.launch({ manifestUrl: configPath }).catch(err => console.log(err));
});
