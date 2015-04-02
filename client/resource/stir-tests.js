require("../test/util/function-bind")();

var sinon = require("sinon");

(function() {  
  var test = require("tessed");
  var client = require("./client")();
  var baseUrl = "/test";
  var stir = require("./stir")(client)(baseUrl);

  var stirTest = test("stir");

  stirTest.beforeEach(function(tt, context) {
    context.server = sinon.fakeServer.create();
    context.server.autoRespond = true;
    tt.end();
  });

  stirTest.afterEach(function(tt, context) {
    context.server.restore();
    tt.end();
  });

  stirTest.test("issues a GET request for get", function(tt, context) {
    var id = 42;

    context.server.respondWith("GET", baseUrl + "/" + id, [
      200,
      { "Content-Type": "application/json" },
      JSON.stringify({ id: id, title: "Test", author: "Test" })
    ]);

    stir.get(id).then(function() {
      tt.end();
    });
  });
})();

(function() {  
  var test = require("tape");
  var client = sinon.spy();
  var baseUrl = "/test";
  var stir = require("./stir")(client)(baseUrl);

  test("issues a GET request for get", function(tt) {
    tt.plan(1);

    var id = 42;
    stir.get(id);
    
    tt.ok(client.calledWith({method: "GET", path: baseUrl + "/" + id}), "client called for get");
  });
})();
