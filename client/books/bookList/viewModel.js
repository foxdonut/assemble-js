var ko = require("knockout");

module.exports = function(bookList) {
  var self = this;

  self.books = ko.observableArray(bookList);

  self.deleteBook = function(book) {
    self.books.remove(book);
    return book;
  };

  self.addBook = function(book) {
    self.books.push(book);
  };
};
