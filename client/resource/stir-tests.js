require("../test/util/function-bind")();

var test = require("tape");
var sinon = require("sinon");
var client = sinon.spy();
var baseUrl = "/test";
var stir = require("./stir")(client)(baseUrl);

test("issues a GET request for get", function(tt) {
  tt.plan(1);

  var id = 42;
  stir.get(id);

  tt.ok(client.calledWith({method: "GET", path: baseUrl + "/" + id}), "client called for get");
});
