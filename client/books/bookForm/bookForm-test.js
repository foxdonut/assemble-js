var tessed = require("tessed");
var sinon = require("sinon");

var ko = require("knockout");
var $ = require("jquery");
var _ = require("lodash");

var template = require("./template.html");
var ViewModel = require("./viewModel");

var bookFormTest = tessed("books/bookForm/bookForm-test");

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
var saveButton = "input[data-action='save']";
var cancelButton = "button[data-action='cancel']";

var authorField = "input[data-field='author']";
var titleField = "input[data-field='title']";

var book = { author: "Test1", title: "One" };

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

  context.viewModel.editBook(book);

  var form = div.find("form");
  tt.equal(form.size(), 1, "renders a form");
  tt.notEqual(form.css("display"), "none", "form is visible");

  tt.equal(div.find(authorField).val(), book.author, "populates author input");
  tt.equal(div.find(titleField).val(), book.title, "populates title input");
});

bookFormTest.test("save book", function(tt, context) {
  tt.plan(1);

  var div = context.div;
  var viewModel = context.viewModel;

  div.find(authorField).val(book.author);
  div.find(titleField).val(book.title);

  sinon.spy(viewModel, "onSave");
  div.find(saveButton).trigger("click");
  tt.ok(viewModel.onSave.calledOnce);

  viewModel.onSave.restore();
});

bookFormTest.test("cancel", function(tt, context) {
  tt.plan(3);

  var div = context.div;
  context.viewModel.editBook(book);

  div.find(cancelButton).trigger("click");

  var form = div.find("form");
  tt.equal(form.css("display"), "none", "form is hidden");

  tt.equal(div.find(authorField).val(), "", "clears author input");
  tt.equal(div.find(titleField).val(), "", "clears title input");
});
