var test = require("tessed");
var sinon = require("sinon");

var ko = require("knockout");
var $ = require("jquery");

var top = test("books/bookForm/bookForm");

top.beforeEach(function(tt, context) {
  var div = $("<div/>");
  var template = require("./template.html");
  div.append(template);
  var viewModel = require("./viewModel");
  ko.applyBindings(viewModel, div[0]);

  context.div = div;
  context.viewModel = viewModel;

  tt.end();
});

top.afterEach(function(tt, context) {
  var div = context.div;

  ko.cleanNode(div[0]);
  div.remove();
  
  tt.end();
});

top.test("initial", function(tt, context) {
  tt.plan(2);

  var div = context.div;

  tt.equal(div.find("button[data-action='new']").size(), 1, "renders a New button");
  tt.equal(div.find("form:hidden").size(), 1, "renders a hidden form");
});
