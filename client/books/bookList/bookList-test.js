var test = require("tessed");
var sinon = require("sinon");

var $ = require("jquery");

var template = require("./template.html");
var ViewModel = require("./viewModel");

var componentUtil = require("../../test/util/component-util");

var editButton = "button[data-action='edit']";
var deleteButton = "button[data-action='delete']";

var booksField = "[data-field='books']";
var bookField = "[data-field='book']";
var authorField = "[data-field='author']";
var titleField = "[data-field='title']";

var bookList = [
  { author: "Test1", title: "One" },
  { author: "Test2", title: "Two" }
];

var bookListTest = tessed("books/bookList/bookList-test");

bookListTest.beforeEach(componentUtil.setup(ViewModel));
bookListTest.afterEach(componentUtil.cleanup);

bookListTest.test("book list", function(tt, context) {

  var viewModel = {
    onEdit: sinon.spy(),
    onDelete: sinon.spy()
  };

  tt.plan(3 + bookList.length);

  var items = div.find("li");
  tt.equal(items.size(), bookList.length, "number of books rendered");

  for (var i = 0, t = bookList.length; i < t; i++) {
    tt.equal($(items.get(i)).find("span").html(), bookList[i].title, "book title");
  }
});

bookListTest.test("edit book", function(tt, context) {
  $(items.get(0)).find(editButton).trigger("click");
  tt.ok(viewModel.onEdit.calledOnce, "edit button");
});

bookListTest.test("delete book", function(tt, context) {
  $(items.get(0)).find(deleteButton).trigger("click");
  tt.ok(viewModel.onDelete.calledOnce, "delete button");
});
