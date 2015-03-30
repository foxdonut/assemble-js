var ko = require("knockout");

var books = ko.observableArray();

module.exports = {
  books: books,

  deleteBook: function(book) {
    console.log("deleteBook:", book);
    books.remove(book);
    return book;
  },

  log: function(value) {
    console.log("logged");
    return value;
  },

  addBook: function(book) {
    this.books.push(book);
  }
};
