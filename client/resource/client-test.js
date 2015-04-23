require("../test/util/function-bind")();

var test = require("tape");
var client = require("./client")();
var baseUrl = "/test";

test("resource/client", function(tt) {
  tt.timeoutAfter(1500);

  var req = { method: "GET", path: baseUrl };

  client(req).then(function(response) {
    tt.equal(response.request.headers["Content-Type"], "application/json", "client issues a request");
    tt.end();
  },
  function(err) {
    tt.fail(JSON.stringify(err));
  });
});
