require("../test/util/function-bind")();

var test = require("tape");
var wire = require("wire");
var spec = require("./wire-spec");

test("resource/wire-spec", function(tt) {
  wire(spec).then(function(context) {
    tt.ok(context.client);
    tt.ok(context.stir);
    tt.end();
  },
  tt.fail);
});