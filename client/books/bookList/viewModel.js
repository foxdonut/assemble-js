var ko = require("knockout");

var books = ko.observableArray();

module.exports = {
  books: books,

  deleteBook: function(book) {
    books.remove(book);
    return book;
  },

  addBook: function(book) {
    this.books.push(book);
  }
};
