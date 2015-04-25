var ko = require("knockout");
var _ = require("lodash");

var books = ko.observableArray();
var bookFormViewModel = require("./books/bookForm/viewModel");

module.exports = _.extend({}, bookFormViewModel, {
  books: books,

  /*
  onSave: function() {
    bookFormViewModel.formVisible(false);
  },
  */

  onEdit: function(book) {
    bookFormViewModel.editBook(book);
    bookFormViewModel.formVisible(true);
    return book;
  },

  onDelete: function(book) {
    books.remove(book);
    return book;
  },

  addBook: function(book) {
    books.push(book);
  }
});
