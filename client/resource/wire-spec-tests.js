require("../test/util/function-bind")();

var test = require("tape");
var wire = require("wire");
var spec = require("./wire-spec");
var sinon = require("sinon");
var _ = require("lodash");

test("resource/wire-spec wires correctly", function(tt) {
  wire(spec).then(function(context) {
    tt.ok(context.client);
    tt.ok(context.stir);
    tt.end();
  },
  tt.fail);
});

test("resource/wire-spec passes client to stir", function(tt) {
  tt.timeoutAfter(500);

  var client = sinon.spy();
  var baseUrl = "/test";
  
  var testSpec = _.extend({}, spec, { client: client });
  
  wire(testSpec).then(function(testContext) {
    tt.is(testContext.client, client, "using test client");
    testContext.stir(baseUrl).query();
    tt.ok(client.calledOnce, "client called once");
    tt.end();
  });
});