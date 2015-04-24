var ko = require("knockout");
require("knockout-mapping");

var viewModel = {};

viewModel.formVisible = ko.observable(false);
viewModel.showForm = function() {
  viewModel.formVisible(true);
};
viewModel.hideForm = function() {
  viewModel.formVisible(false);
};

viewModel.book = {
  author: ko.observable(),
  title: ko.observable()
};

viewModel.getBook = function() {
  return ko.toJS(viewModel.book);
};

viewModel.editBook = function(book) {
  ko.mapping.fromJS(book, {}, viewModel.book);
};

viewModel.clear = function() {
  ko.mapping.fromJS({author: "", title: ""}, {}, viewModel.book);
};

module.exports = viewModel;
