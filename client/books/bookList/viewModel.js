module.exports = function(books) {
  var self = this;

  self.books = books;

  self.deleteBook = function(book) {
    self.books.remove(book);
    return book;
  };

  self.addBook = function(book) {
    self.books.push(book);
  };
};
