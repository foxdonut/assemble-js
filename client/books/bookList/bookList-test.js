var tessed = require("tessed");
require("tape-catch");
var sinon = require("sinon");

var $ = require("jquery");

var BookEvents = require("../events");
var component = require("./component");
var componentUtil = require("../../test/util/component-util");

var pubsub = require("../../pubsub/pubsub-jquery");

var editButton = "[data-action='edit']";
var deleteButton = "[data-action='delete']";

var bookField = "[data-field='book']";
var authorField = "[data-field='author']";
var titleField = "[data-field='title']";

var bookList = [
  { author: "Test1", title: "One" },
  { author: "Test2", title: "Two" }
];

var bookListTest = tessed("books/bookList/bookList-test");

bookListTest.beforeEach(componentUtil.setup(component, pubsub));
bookListTest.afterEach(componentUtil.cleanup);

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
