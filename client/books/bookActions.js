var BookEvents = require("./events");

var bookActions = function(dispatcher) {
  return {
    initialize: function() {
      dispatcher.dispatch(BookEvents.READY, {});
    },
    deleteBook: function(book) {
      dispatcher.dispatch(BookEvents.DELETE, book);
    },
    newBook: function() {
      dispatcher.dispatch(BookEvents.NEW, {});
    },
    editBook: function(book) {
      dispatcher.dispatch(BookEvents.EDIT, book);
    },
    saveBook: function(book) {
      dispatcher.dispatch(BookEvents.SAVE, book);
    },
    cancelBook: function() {
      dispatcher.dispatch(BookEvents.CANCEL, {});
    }
  };
};

module.exports = bookActions;
