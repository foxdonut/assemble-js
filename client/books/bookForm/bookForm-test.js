var test = require("tape");
var sinon = require("sinon");

var ko = require("knockout");
var $ = require("jquery");

test("books/bookForm/bookForm", function(tt) {
  var div = $("<div/>");
  var template = require("./template.html");
  var viewModel = require("./viewModel");
  ko.applyBindings(viewModel, div[0]);

  tt.end();
});
