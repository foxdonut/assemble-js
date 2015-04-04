var test = require("tape");
var sinon = require("sinon");

var ko = require("knockout");
var $ = require("jquery");

test("bookList/view", function(tt) {
  var div = $("<div/>");
  var view = require("./view.html");
  
  div.append(view);
  
  var bookList = [
    { title: "One" },
    { title: "Two" }
  ];
  
  var spy = sinon.spy();

  var viewModel = {
    books: ko.observableArray(bookList),
    deleteBook: spy
  };
  
  ko.applyBindings(viewModel, div[0]);
  
  tt.plan(2 + bookList.length);

  var items = div.find("li");
  tt.equal(items.size(), bookList.length, "number of books rendered");
  
  for (var i = 0, t = bookList.length; i < t; i++) {
    tt.equal($(items.get(i)).find("span").html(), bookList[i].title, "book title");
  }
  
  $(items.get(0)).find("button").trigger("click");
  
  tt.ok(spy.calledOnce, "delete button");
});
