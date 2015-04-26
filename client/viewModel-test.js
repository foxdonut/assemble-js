var test = require("tape");

var viewModel = require("./viewModel")();

test("viewModel-test", function(tt) {
  tt.plan(4);

  var bookList = [
    { id: 11, title: "One" },
    { id: 22, title: "Two" }
  ];

  viewModel.books(bookList);
  tt.equal(bookList, viewModel.books(), "books");

  var newLength = bookList.length + 1;
  viewModel.addBook({ id: 42, title: "Another" });
  tt.equal(viewModel.books().length, newLength, "addBook");

  newLength = bookList.length - 1;
  var bookToDelete = bookList[0];
  var deletedBook = viewModel.onDelete(bookToDelete);
  tt.equal(viewModel.books().length, newLength, "deleteBook");
  tt.equal(deletedBook, bookToDelete, "deleted book");
});
