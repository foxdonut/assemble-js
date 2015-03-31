define(function(require, exports, module) {

var ko = require("knockout");

var books = ko.observableArray();

module.exports = {
  books: books,

  deleteBook: function(book) {
    console.log("deleteBook:", book);
    books.remove(book);
    return book;
  },

  addBook: function(book) {
    this.books.push(book);
  }
};

});
