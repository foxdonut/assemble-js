var _ = require("lodash");
var BookEvents = require("./events");

var store = function(pubsub, bookResource) {
  var bookList = [];

  var publishData = function() {
    console.log("publish:", bookList);
    pubsub.publish(BookEvents.DATA, bookList);
  };

  var findBookIndex = function(book) {
    return _.findIndex(bookList, {id: book.id});
  };

  var onReady = function() {
    bookResource.query().then(function(response) {
      bookList = response;
      publishData();
    });
  };
  pubsub.subscribe(BookEvents.READY, onReady);

  var onDelete = function(book) {
    bookResource.delete(book).then(function() {
      var index = findBookIndex(book);

      if (index >= 0 && index < bookList.length) {
        bookList.splice(index, 1);
        publishData();
      }
    });
  };
  pubsub.subscribe(BookEvents.DELETE, onDelete);

  var onSave = function(book) {
    console.log("onSave:", book);
    bookResource.save(book).then(function(response) {
      var updatedBook = response;
      var index = findBookIndex(updatedBook);

      if (index >= 0) {
        bookList[index] = updatedBook;
      }
      else {
        bookList.push(updatedBook);
      }
      publishData();
    });
  };
  pubsub.subscribe(BookEvents.SAVE, onSave);
};

module.exports = store;

