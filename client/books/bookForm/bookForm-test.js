var tessed = require("tessed");
var sinon = require("sinon");

var ko = require("knockout");
var $ = require("jquery");
var _ = require("lodash");

var template = require("./template.html");
var ViewModel = require("./viewModel");

var bookFormTest = tessed("books/bookForm/bookForm");

bookFormTest.beforeEach(function(tt, context) {
  var div = $("<div/>");
  div.append(template);
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, div[0]);

  context.div = div;
  context.viewModel = viewModel;

  tt.end();
});

bookFormTest.afterEach(function(tt, context) {
  var div = context.div;

  ko.cleanNode(div[0]);
  div.remove();

  tt.end();
});

var newButton = "button[data-action='new']";

bookFormTest.test("initial", function(tt, context) {
  tt.plan(2);

  var div = context.div;

  tt.equal(div.find(newButton).size(), 1, "renders a New button");
  tt.equal(div.find("form:hidden").size(), 1, "renders a hidden form");
});

bookFormTest.test("new book", function(tt, context) {
  tt.plan(2);
  
  var div = context.div;
  div.find(newButton).trigger("click");

  var form = div.find("form");
  tt.equal(form.size(), 1, "renders a form");
  tt.notEqual(form.css("display"), "none", "form is visible");
});

bookFormTest.test("edit book", function(tt, context) {
  tt.plan(4);
  
  var div = context.div;
  var book = { author: "Test1", title: "One" };

  context.viewModel.editBook(book);

  var form = div.find("form");
  tt.equal(form.size(), 1, "renders a form");
  tt.notEqual(form.css("display"), "none", "form is visible");

  tt.equal(div.find("input[data-field='author']").val(), book.author, "populates author input");
  tt.equal(div.find("input[data-field='title']").val(), book.title, "populates title input");
});
