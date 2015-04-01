// for bind not being in phantomjs
if (!Function.prototype.bind) {
  Function.prototype.bind = Function.prototype.bind || function (thisp) {
    var fn = this;
    return function () {
        return fn.apply(thisp, arguments);
    };
  };
}

var redtape = require("redtape");
var sinon = require("sinon");

var client = require("./client")();
var baseUrl = "/test";
var stir = require("./stir")(client)(baseUrl);

var server = null;

var beforeEach = function() {
  server = sinon.fakeServer.create();
  server.autoRespond = true;
};

var afterEach = function() {
  server.restore();
};

/*
var test = redtape(beforeEach, afterEach);
*/

var test = require("tape");

test("stir issues a GET request for get", function(tt) {
  beforeEach();
  var id = 42;

  server.respondWith([
    200,
    { "Content-Type": "application/json" },
    JSON.stringify({ id: id, title: "Test", author: "Test" })      
  ]);

  stir.get(id).then(function() {
    tt.end();
  });
});
