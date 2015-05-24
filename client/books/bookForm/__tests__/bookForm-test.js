jest.dontMock("../component");

var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

var componentTestUtils = require("../../../test/component-test-utils");

var BookForm = require("../component");
var BookEvents = require("../../events");
var pubsub = require("../../../pubsub/pubsub-jquery");

var book = { author: "Test1", title: "One" };

describe("BookForm component", function() {
  var context = {};

  beforeEach(componentTestUtils.setup(BookForm, pubsub, context));
  afterEach(componentTestUtils.cleanup);

  xdescribe("initial", function() {
    it("renders a New button", function() {
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookList");
      expect(bookListElement).toBeDefined();
    });

    it("does not render the form", function() {
      pubsub.publish(BookEvents.DATA, bookList);
      var bookListElements = componentTestUtils.findAllByAttribute(context.testComponent, "data-element", "book");
      expect(bookListElements.length).toEqual(bookList.length);

      for (var i = 0, t = bookList.length; i < t; i++) {
        var bookListElement = bookListElements[i];

        var titleElement = componentTestUtils.findByAttribute(bookListElement, "data-element", "title");
        expect(titleElement.getDOMNode().textContent).toEqual(bookList[i].title);

        var authorElement = componentTestUtils.findByAttribute(bookListElement, "data-element", "author");
        expect(authorElement.getDOMNode().textContent).toEqual(bookList[i].author);
      }
    });
  });

  xdescribe("book functions", function() {
    it("emits an event to edit a book", function() {
      var onEditSpy = jasmine.createSpy("onEdit");
      pubsub.subscribe(BookEvents.EDIT, onEditSpy);

      pubsub.publish(BookEvents.DATA, bookList);
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "book");
      var editButton = componentTestUtils.findByAttribute(bookListElement, "data-action", "edit");
      TestUtils.Simulate.click(editButton);
      expect(onEditSpy).toHaveBeenCalledWith(bookList[0]);
    });

    it("emits an event to delete a book", function() {
      var onDeleteSpy = jasmine.createSpy("onDelete");
      pubsub.subscribe(BookEvents.DELETE, onDeleteSpy);

      pubsub.publish(BookEvents.DATA, bookList);
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "book");
      var deleteButton = componentTestUtils.findByAttribute(bookListElement, "data-action", "delete");
      TestUtils.Simulate.click(deleteButton);
      expect(onDeleteSpy).toHaveBeenCalledWith(bookList[0]);
    });
  });
});

/*
bookFormTest.test("initial", function(tt, context) {
  tt.plan(2);

  var div = context.div;

  tt.equal(div.find(newButton).size(), 1, "renders a New button");
  tt.equal(div.find("form:visible").size(), 0, "does not initially render a form");
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
*/