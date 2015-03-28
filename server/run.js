var app = require("./app");

var port = process.env.PORT || 4000;
var ip = process.env.IP || "0.0.0.0";

app.listen(port, ip, function() {
  console.log("listening on", ip, "port", port);
});
