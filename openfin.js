const openfinLauncher = require("hadouken-js-adapter");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const configPath = `http://localhost:${PORT}/app.json`;

console.log(
  "Server created, starting OpenFin from manifest at",
  configPath,
  "\n"
);

openfinLauncher
  .launch({ manifestUrl: configPath })
  .catch(err => console.log(err));
