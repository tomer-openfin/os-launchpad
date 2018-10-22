const openfinLauncher = require('hadouken-js-adapter');
const path = require("path");
const express = require("express");
const http = require('http');

const configPath = path.resolve("./dist/app.json");

const app = express();

app.use(express.static("./dist"));

http.createServer(app).listen(9001, () => {
    console.log("Server created, starting OpenFin...");
    openfinLauncher.launch({ manifestUrl: configPath }).catch(err => console.log(err));
});
