var ko = require("knockout");

var viewModel = function() {
  var obj = {};

  obj.books = ko.observableArray();

  obj.onEdit = function(book) {
  };
  obj.onDelete = function(book) {
    return obj.books.remove(book)[0];
  };

  obj.addBook = function(book) {
    obj.books.push(book);
  };

  return obj;
};

module.exports = viewModel;
