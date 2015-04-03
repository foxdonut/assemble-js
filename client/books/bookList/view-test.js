var test = require("tape");

var ko = require("knockout");
var $ = require("jquery");

test("bookList/view", function(tt) {
  tt.plan(1);

  var div = $("<div/>");
  var view = require("./view.html");
  
  div.append(view);
  
  var bookList = [
    { title: "One" },
    { title: "Two" }
  ];
  
  var viewModel = {
    books: ko.observableArray(bookList)
  };
  
  ko.applyBindings(viewModel, div[0]);
  
  tt.equal(div.find("li").size(), bookList.length, "number of books rendered");
});
