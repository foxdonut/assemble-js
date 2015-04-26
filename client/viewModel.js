var _ = require("lodash");

var bookFormViewModel = require("./books/bookForm/viewModel");
var bookListViewModel = require("./books/bookList/viewModel");

var viewModel = function() {
  var obj = bookFormViewModel();
  _.extend(obj, bookListViewModel());
  return obj;
};

module.exports = viewModel;
