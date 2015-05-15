var _ = require("lodash");
var BookEvents = require("./events");

var store = function(radio, bookResource) {
  var bookList = [];

  var broadcastChange = function() {
    radio(BookEvents.CHANGE).broadcast(bookList);
  };

  var onReady = function() {
    bookResource.query().then(function(response) {
      bookList = response.entity;
      broadcastChange();
    });
  };

  var onDelete = function(book) {
    bookResource.delete(book).then(function() {
      var index = _.findIndex(bookList, {id: book.id});

      if (index >= 0 && index < bookList.length) {
        bookList.splice(index, 1);
        broadcastChange();
      }
    });
  };

  radio(BookEvents.READY).subscribe(onReady);
  radio(BookEvents.DELETE).subscribe(onDelete);
};

module.exports = store;

