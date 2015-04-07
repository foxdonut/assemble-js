var app = require("./app");
var argv = require("yargs").argv;

var port = argv.port || process.env.PORT || 3000;
var ip = argv.ip || "0.0.0.0";

app.listen(port, ip, function() {
  console.log("listening on", ip, "port", port);
});
