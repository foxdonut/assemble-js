var test = require("tape");
var sinon = require("sinon");

var ko = require("knockout");
var $ = require("jquery");

test("books/bookList/bookList-test", function(tt) {
  var div = $("<div/>");
  var template = require("./template.html");

  div.append(template);

  var bookList = [
    { author: "Test1", title: "One" },
    { author: "Test2", title: "Two" }
  ];

  var viewModel = {
    books: ko.observableArray(bookList),
    onEdit: sinon.spy(),
    onDelete: sinon.spy()
  };

  ko.applyBindings(viewModel, div[0]);

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
