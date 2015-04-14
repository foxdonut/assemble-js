var ko = require("knockout");

var viewModel = {};

viewModel.formVisible = ko.observable(false);

viewModel.book = {
  author: ko.observable(),
  title: ko.observable()
};

viewModel.getBook = function() {
  return ko.toJS(viewModel.book);
};

viewModel.editBook = function(book) {
  viewModel.book = ko.mapping.fromJS(book);
};

viewModel.clear = function() {
  viewModel.book.author("");
  viewModel.book.title("");
};

module.exports = viewModel;
