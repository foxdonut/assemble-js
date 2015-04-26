var ko = require("knockout");

var _ = require("lodash");

var viewModel = function() {
  var obj = {};

  obj.books = ko.observableArray();

  obj.observableBook = function(book) {
    return {
      id: book.id,
      author: ko.observable(book.author),
      title: ko.observable(book.title)
    };
  };

  obj.setBooks = function(books) {
    obj.books(_.map(books, obj.observableBook));
  };

  obj.onEdit = function(book) {
    return book;
  };
  obj.onDelete = function(book) {
    return obj.books.remove(book)[0];
  };

  obj.addOrUpdateBook = function(book) {
    var existingBook = _.findWhere(obj.books(), {id: book.id});

    if (existingBook) {
      existingBook.author(book.author);
      existingBook.title(book.title);
    }
    else {
      obj.books.push(obj.observableBook(book));
    }
  };

  return obj;
};

module.exports = viewModel;
