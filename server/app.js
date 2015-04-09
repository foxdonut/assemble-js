var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use("/node_modules", express.static("node_modules"));
app.use("/common", express.static("common"));

app.use(bodyParser.json());

require("./routes/routes").setup(app);

module.exports = app;
