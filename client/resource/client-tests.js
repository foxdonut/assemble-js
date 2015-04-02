require("../test/util/function-bind")();

var sinon = require("sinon");

var test = require("tessed");
var client = require("./client")();
var baseUrl = "/test";

var clientTest = test("client");

clientTest.beforeEach(function(tt, context) {
  console.log("beforeEach");
  context.xhr = sinon.useFakeXMLHttpRequest();
  
  context.xhr.onCreate = function(request) {
    console.log("request before:", JSON.stringify(request));
    context.onRequest(request);
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
  
  context.onRequest = function(request) {
    console.log("trying to respond to request:", request.method, request.url);
    request.readyState = 1;
    request.onSend = function(xhr) {
      xhr.readyStateChange(4);
    };
    request.respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify({ id: 1, title: "Test", author: "Test" })
    );
  };
  
  client(req).then(function(response) {
    console.log("received response:", JSON.stringify(response));
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
