var ko = require("knockout");
require("knockout-mapping");

var _ = require("lodash");

var viewModel = function() {
  var obj = {};

  obj.books = ko.observableArray();

  obj.onEdit = function(book) {
    return book;
  };
  obj.onDelete = function(book) {
    return obj.books.remove(book)[0];
  };

  obj.addOrUpdateBook = function(book) {
    var existingBook = _.where(obj.books, {id: book.id});

    if (existingBook) {
      ko.mapping.fromJS(book, {}, existingBook);
    }
    else {
      obj.books.push(book);
    }
  };

  return obj;
};

module.exports = viewModel;
