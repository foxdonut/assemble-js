var ko = require("knockout");

var ViewModel = function() {

  var self = this;

  self.books = ko.observableArray();

  self.addBook = function(book) {
    self.books.push(book);
  }
};

module.exports = ViewModel;
