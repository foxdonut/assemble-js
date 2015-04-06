var ko = require("knockout");

var books = ko.observableArray();

module.exports = {
  books: books,

  deleteBook: function(book) {
    console.log("delete book:", book);
    books.remove(book);
    return book;
  },

  addBook: function(book) {
    books.push(book);
  }
};
