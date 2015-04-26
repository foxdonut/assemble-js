var test = require("tessed");
var sinon = require("sinon");

var template = require("./template.html");
var ViewModel = require("./viewModel");

var componentUtil = require("../../test/util/component-util");

var bookListTest = tessed("books/bookList/bookList-test");

bookListTest.beforeEach(componentUtil.setup(ViewModel));
bookListTest.afterEach(componentUtil.cleanup);

bookListTest.test("books/bookList/bookList-test", function(tt, context) {
  var bookList = [
    { author: "Test1", title: "One" },
    { author: "Test2", title: "Two" }
  ];

  var viewModel = {
    books: ko.observableArray(bookList),
    onEdit: sinon.spy(),
    onDelete: sinon.spy()
  };

  tt.plan(3 + bookList.length);

  var items = div.find("li");
  tt.equal(items.size(), bookList.length, "number of books rendered");

  for (var i = 0, t = bookList.length; i < t; i++) {
    tt.equal($(items.get(i)).find("span").html(), bookList[i].title, "book title");
  }

  $(items.get(0)).find("button[data-action='edit']").trigger("click");
  tt.ok(viewModel.onEdit.calledOnce, "edit button");

  $(items.get(0)).find("button[data-action='delete']").trigger("click");
  tt.ok(viewModel.onDelete.calledOnce, "delete button");
});
