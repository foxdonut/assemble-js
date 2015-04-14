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

module.exports = viewModel;
