var _ = require("lodash");
var BookEvents = require("./events");

var store = function(pubsub, bookResource) {
  var bookList = [];

  var publishChange = function() {
    pubsub.publish(BookEvents.CHANGE, bookList);
  };

  var findBookIndex = function(book) {
    return _.findIndex(bookList, {id: book.id});
  };

  var onReady = function() {
    bookResource.query().then(function(response) {
      bookList = response.entity;
      publishChange();
    });
  };
  pubsub.subscribe(BookEvents.READY, onReady);

  var onDelete = function(book) {
    bookResource.delete(book).then(function() {
      var index = findBookIndex(book);

      if (index >= 0 && index < bookList.length) {
        bookList.splice(index, 1);
        publishChange();
      }
    });
  };
  pubsub.subscribe(BookEvents.DELETE, onDelete);

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
      publishChange();
    });
  };
  pubsub.subscribe(BookEvents.SAVE, onSave);
};

module.exports = store;

