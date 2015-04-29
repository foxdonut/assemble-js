var tessed = require("tessed");
require("tape-catch");
var sinon = require("sinon");

var $ = require("jquery");

var component = require("./component")();
var viewModel = component.viewModel;

var componentUtil = require("../../test/util/component-util");

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

bookListTest.beforeEach(componentUtil.setup(component));
bookListTest.afterEach(componentUtil.cleanup);

bookListTest.test("book list", function(tt, context) {
  tt.plan(1 + (2 * bookList.length));

  var div = context.div;

  viewModel.books(bookList);
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

  var viewModel = context.viewModel;
  var div = context.div;

  viewModel.books([bookList[0]]);

  sinon.spy(viewModel, "onEdit");

  div.find(editButton).trigger("click");
  tt.ok(viewModel.onEdit.calledOnce, "edit button");

  viewModel.onEdit.restore();
});

bookListTest.test("delete book", function(tt, context) {
  tt.plan(1);

  var viewModel = context.viewModel;
  var div = context.div;

  viewModel.books([bookList[0]]);

  sinon.spy(viewModel, "onDelete");

  div.find(deleteButton).trigger("click");
  tt.ok(viewModel.onDelete.calledOnce, "delete button");

  viewModel.onDelete.restore();
});
