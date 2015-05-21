jest.dontMock("../component");
jest.dontMock("../../events");
jest.dontMock("jquery");
jest.dontMock("../../../pubsub/pubsub-jquery");
jest.dontMock("../../../test/component-test-utils");

var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

var componentTestUtils = require("../../../test/component-test-utils");

var BookList = require("../component");
var BookEvents = require("../../events");
var pubsub = require("../../../pubsub/pubsub-jquery");

var bookList = [
  { author: "Test1", title: "One" },
  { author: "Test2", title: "Two" }
];

describe("BookList component", function() {
  describe("book list", function() {
    var context = {};

    beforeEach(componentTestUtils.setup(BookList, pubsub, context));
    afterEach(componentTestUtils.cleanup);

    it("displays an initially empty list", function() {
      var bookList = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookList");
      expect(bookList).toBeDefined();
    });
  });
});

/*
bookListTest.test("book list", function(tt, context) {
  tt.plan(1 + (2 * bookList.length));

  var div = context.div;

  pubsub.publish(BookEvents.DATA, bookList);
  var books = div.find(bookField);

  tt.equal(books.size(), bookList.length, "number of books rendered");

  for (var i = 0, t = bookList.length; i < t; i++) {
    var book = $(books.get(i));
    tt.equal(book.find(authorField).html(), bookList[i].author, "book author");
    tt.equal(book.find(titleField).html(), bookList[i].title, "book title");
  }
});

bookListTest.test("edit book", function(tt, context) {
  tt.plan(1);

  var div = context.div;

  pubsub.publish(BookEvents.DATA, [bookList[0]]);

  var onEdit = sinon.spy();
  pubsub.subscribe(BookEvents.EDIT, onEdit);

  div.find(editButton).trigger("click");
  tt.ok(onEdit.calledOnce, "edit button");

  pubsub.unsubscribe(BookEvents.EDIT, onEdit);
});

bookListTest.test("delete book", function(tt, context) {
  tt.plan(1);

  var div = context.div;

  pubsub.publish(BookEvents.DATA, [bookList[0]]);

  var onDelete = sinon.spy();
  pubsub.subscribe(BookEvents.DELETE, onDelete);

  div.find(deleteButton).trigger("click");
  tt.ok(onDelete.calledOnce, "delete button");

  pubsub.unsubscribe(BookEvents.DELETE, onDelete);
});
*/

