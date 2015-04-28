var componentRegistry = require("../../component/registry");

componentRegistry.register("book-list", require("../bookList/template.html"));
componentRegistry.register("book-form", require("../bookForm/template.html"));

module.exports = function() {
  var bookFormViewModel = require("../bookForm/viewModel")();
  var bookListViewModel = require("../bookList/viewModel")();

  return { bookFormViewModel: bookFormViewModel, bookListViewModel: bookListViewModel };
};
