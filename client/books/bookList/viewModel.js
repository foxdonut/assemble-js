var _ = require("lodash");

var viewModel = function() {
  var obj = {
    data: {
      books: []
    }
  };

  var findBookIndex = function(book) {
    return _.findIndex(obj.data.books, {id: book.id});
  };

  obj.setBooks = function(books) {
    obj.data.books = books;
  };

  obj.addOrUpdateBook = function(book) {
    var existingBookIndex = findBookIndex(book);

    if (parseInt(existingBookIndex, 10) >= 0) {
      obj.data.books[existingBookIndex] = book;
    }
    else {
      obj.data.books.push(book);
    }
  };

  obj.onEdit = function(book) {
    event.original.preventDefault();
    return book;
  };
  obj.onDelete = function(book) {
    event.original.preventDefault();
    obj.data.books.splice(findBookIndex(book), 1);
    return book;
  };

  return obj;
};

module.exports = viewModel;
