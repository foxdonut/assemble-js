// for bind not being in phantomjs
if (!Function.prototype.bind) {
  Function.prototype.bind = Function.prototype.bind || function (thisp) {
    var fn = this;
    return function () {
        return fn.apply(thisp, arguments);
    };
  };
}

var test = require("tessed");
var sinon = require("sinon");

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
