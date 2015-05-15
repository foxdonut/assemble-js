var _ = require("lodash");
var BookEvents = require("./events");

var store = function(radio, bookResource) {
  var bookList = [];

  var broadcastChange = function() {
    radio(BookEvents.CHANGE).broadcast(bookList);
  };

  var findBookIndex = function(book) {
    return _.findIndex(bookList, {id: book.id});
  };

  var onReady = function() {
    bookResource.query().then(function(response) {
      bookList = response.entity;
      broadcastChange();
    });
  };
  radio(BookEvents.READY).subscribe(onReady);

  var onDelete = function(book) {
    bookResource.delete(book).then(function() {
      var index = findBookIndex(book);

      if (index >= 0 && index < bookList.length) {
        bookList.splice(index, 1);
        broadcastChange();
      }
    });
  };
  radio(BookEvents.DELETE).subscribe(onDelete);

  var onSave = function(book) {
    bookResource.save(book).then(function(response) {
      var updatedBook = response.entity;
      var index = findBookIndex(updatedBook);

      if (index >= 0) {
        bookList[index] = updatedBook;
      }
      else {
        bookList.push(updatedBook);
      }
      broadcastChange();
    });
  };
  radio(BookEvents.SAVE).subscribe(onSave);
};

module.exports = store;

