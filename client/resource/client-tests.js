require("../test/util/function-bind")();

var sinon = require("sinon");

var test = require("tessed");
var client = require("./client")();
var baseUrl = "/test";

var clientTest = test("client");

clientTest.beforeEach(function(tt, context) {
  context.xhr = sinon.useFakeXMLHttpRequest();
  context.requests = [];
  
  context.xhr.onCreate = function(request) {
    context.requests.push(request);
    console.log("request before:", JSON.stringify(request));
    request.readyState = 1;
    request.respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify({ id: 1, title: "Test", author: "Test" })
    );
    request.readyState = 4;
    console.log("request after:", JSON.stringify(request));
  };

  tt.end();
});

clientTest.afterEach(function(tt, context) {
  console.log("afterEach");
  context.xhr.restore();
  tt.end();
});

clientTest.test("issues a request", function(tt, context) {
  tt.timeoutAfter(1500);

  var id = 42;
  var req = { method: "GET", path: baseUrl };
  
  client(req).then(function() {
    // console.log("c.r 2:", context.requests.length);
    console.log("received response");
    tt.equal(context.requests.length, 1);
    console.log(JSON.stringify(context.requests[0]));
    tt.end();
  },
  function(err) {
    console.log("request in fail:", JSON.stringify(context.requests));
    tt.fail(JSON.stringify(err));
  },
  function(done) {
    console.log("request in done:", JSON.stringify(context.requests));
    tt.fail(JSON.stringify(done));
  });
});
