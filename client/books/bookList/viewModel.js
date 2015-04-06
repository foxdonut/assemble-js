module.exports = function(params) {
  var self = this;

  self.books = params.books;

  self.deleteBook = function(book) {
    self.books.remove(book);
    return book;
  };

  self.addBook = function(book) {
    self.books.push(book);
  };
};
