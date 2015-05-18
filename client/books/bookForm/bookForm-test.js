var tessed = require("tessed");
require("tape-catch");
var sinon = require("sinon");

var BookEvents = require("../events");
var component = require("./component");
var componentUtil = require("../../test/util/component-util");

var pubsub = require("../../pubsub/pubsub-jquery");

var newButton = "[data-action='new']";
var saveButton = "[data-action='save']";
var cancelButton = "[data-action='cancel']";

var authorField = "[data-field='author']";
var titleField = "[data-field='title']";

var book = { author: "Test1", title: "One" };

var bookFormTest = tessed("books/bookForm/bookForm-test");

bookFormTest.beforeEach(componentUtil.setup(component, pubsub));
bookFormTest.afterEach(componentUtil.cleanup);

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
  pubsub.publish(BookEvents.EDIT, book);

  var form = div.find("form");
  tt.equal(form.size(), 1, "renders a form");
  tt.notEqual(form.css("display"), "none", "form is visible");

  tt.equal(div.find(authorField).val(), book.author(), "populates author input");
  tt.equal(div.find(titleField).val(), book.title(), "populates title input");
});

bookFormTest.test("save book", function(tt, context) {
  tt.plan(1);

  var div = context.div;

  div.find(authorField).val(book.author);
  div.find(titleField).val(book.title);

  var onSave = sinon.spy();
  pubsub.subscribe(BookEvents.SAVE, onSave);

  div.find(saveButton).trigger("click");
  tt.ok(onSave.calledOnce, "save book");

  pubsub.unsubscribe(BookEvents.SAVE, onSave);
});

bookFormTest.test("cancel", function(tt, context) {
  tt.plan(3);

  var div = context.div;
  pubsub.publish(BookEvents.EDIT, book);

  div.find(cancelButton).trigger("click");

  var form = div.find("form");
  tt.equal(form.css("display"), "none", "form is hidden");

  tt.equal(div.find(authorField).val(), "", "clears author input");
  tt.equal(div.find(titleField).val(), "", "clears title input");
});
