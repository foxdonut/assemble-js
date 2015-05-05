var _ = require("lodash");

var viewModel = function() {
  var obj = {
    data: {}
  };

  obj.data.books = [];

  obj.setBooks = function(books) {
    obj.data.books = books;
  };

  obj.addOrUpdateBook = function(book) {
    var existingBookIndex = _.findIndex(obj.data.books, {id: book.id});

    if (existingBookIndex) {
      obj.data.books[existingBookIndex] = book;
    }
    else {
      obj.data.books.push(book);
    }
  };

  obj.onEdit = function(book) {
    return book;
  };
  obj.onDelete = function(book) {
    //return obj.books.remove(book)[0];
  };

  return obj;
};

module.exports = viewModel;
