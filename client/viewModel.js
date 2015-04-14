var ko = require("knockout");
var _ = require("lodash");

var books = ko.observableArray();
var bookFormViewModel = require("./books/bookForm/viewModel");

module.exports = _.extend({}, bookFormViewModel, {
  books: books,
  
  onNew: function() {
    bookFormViewModel.formVisible(true)
  },
  
  onSave: function() {
    bookFormViewModel.formVisible(false);
  },
  
  onCancel: function() {
    //bookFormViewModel.book({});
    bookFormViewModel.formVisible(false)
  },
  
  deleteBook: function(book) {
    books.remove(book);
    return book;
  },

  addBook: function(book) {
    books.push(book);
  }
});
