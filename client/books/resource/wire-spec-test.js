require("../../test/util/function-bind")();

var test = require("tape");
var sinon = require("sinon");
var wire = require("wire");
var spec = require("./wire-spec");
var _ = require("lodash");

test("books/resource/wire-spec wires correctly", function(tt) {
  tt.plan(1);

  wire(spec).then(function(context) {
    tt.ok(context.bookResource, "bookResource");
  },
  tt.fail);  
});

test("books/resource/wire-spec creates stir and calls query when ready", function(tt) {
  tt.plan(1);

  var spy = sinon.spy();
  var stir = function() {
    return {
      query: spy
    };
  };
  var testSpec = _.extend({}, spec, { stir: stir });
  
  wire(testSpec).then(function(context) {
    tt.ok(spy.calledOnce, "query called");
  },
  tt.fail);
});